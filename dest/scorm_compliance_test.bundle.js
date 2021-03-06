"use strict";
webpackJsonp([1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var SCORMComplaince = __webpack_require__(8);
	React.renderComponent(SCORMComplaince(), document.getElementById('app'));

/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var ClassBuilder = __webpack_require__(4);

	function splits (string) {
	    return string.split(/[\s,]+/);
	}

	var ClassMixin = {
	    propTypes: {
	        type: React.PropTypes.string,
	        color: React.PropTypes.string,
	        is: React.PropTypes.oneOfType([
	            React.PropTypes.string,
	            React.PropTypes.array
	        ]),
	        modifier: React.PropTypes.oneOfType([
	            React.PropTypes.string,
	            React.PropTypes.array
	        ])
	    },
	    ClassMixin_getClass: function(className){
	        className = className || this._descriptor.type.displayName;
	        var classBuilder = new ClassBuilder(className);

	        classBuilder = this.ClassMixin_applyModifiers(classBuilder);
	        classBuilder = this.ClassMixin_applyIs(classBuilder);

	        if (this.props.className) {
	            classBuilder.add(this.props.className);
	        }

	        return classBuilder;
	    },
	    ClassMixin_applyModifiers: function (classBuilder) {
	        if (this.props.modifier) {

	            // If comma string turn into an array.
	            if (typeof this.props.modifier === 'string') {
	                var modifiers = splits(this.props.modifier);
	                this.props.modifier = modifiers.filter(function(m) {
	                    return !!m; // Remove all falsey values. The values false, null, 0, "", undefined, and NaN are all falsey.
	                });
	            }
	            
	            // Apply the modifiers
	            this.props.modifier.forEach(function(e) {
	                classBuilder.modifier(e);
	            });
	        } 
	        return classBuilder;
	    },
	    ClassMixin_applyIs: function (classBuilder) {
	        if (this.props.is) {

	            if(typeof this.props.is === 'string'){
	                this.props.is = [this.props.is];
	            }

	            this.props.is.forEach(function(e) {
	                classBuilder.is(e);
	            });

	        }
	        return classBuilder;
	    }
	};

	module.exports = ClassMixin;

/***/ },
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var ClassBuilder = function (className) {
	    this.displayName = className || '';
	    this.className = className || '';
	};

	ClassBuilder.prototype.add = function (condition, passClass, failClass) {
	    if(condition) {
	        if (passClass) {
	            if (condition) {
	                this.className += ' ' + passClass;
	            } else if (failClass) {
	                this.className += ' ' + failClass;
	            }
	        } else {
	            this.className += ' ' + condition;
	        } 
	    }
	    
	    return this;
	};

	ClassBuilder.prototype.modifier = function (str) {
	    if (str) {
	        this.add(this.displayName + '-' + str);
	    }
	    return this;
	};

	ClassBuilder.prototype.is = function (condition, name) {
	    var str = ' is-' + name || condition;
	    if (condition) {
	        this.className += str;
	    } else {
	        this.className = this.className.replace(str, '');
	    }
	    return this;
	};

	module.exports = ClassBuilder;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(3);

	var storedData = {};
	var _data = {};
	var _errorCode = 0;

	var API_1484_11 = {
	    Initialize: function () {
	        SCORM.log(new Date());
	        SCORM.success("Initialize");
	        return 'true';
	    },
	    Terminate: function () {
	        SCORM.success("Terminated");
	        SCORM.info("Stored Data: ");
	        SCORM.log(JSON.stringify(storedData));
	        SCORM.log('\n');
	        return "true";
	    },
	    GetValue: function (str) {
	        var data = _data[str];
	        if(data) {
	            SCORM.info("GetValue(" + str + ")", data);
	            return data;            
	        } else {
	            SCORM.error("Failed to GetValue: ", str);
	            _errorCode = 301;
	            return '';
	        }
	    },
	    SetValue: function (name, value) {
	        SCORM.log("SetValue(" + name + ", " + value + ")");
	        storedData[name] = value;
	        return "true";
	    },
	    Commit: function () {
	        SCORM.success("Commit");
	        return "true";
	    },
	    GetLastError: function () {
	        return _errorCode;
	    },
	    GetErrorString: function () {
	        // SCORM.log("GetErrorString");
	        return _errorCode;
	    },
	    GetDiagnostic: function () {
	        SCORM.log("GetDiagnostic");
	        return "true";
	    }
	};

	var SCORM = {
	    initialize: function () {
	        window['API_1484_11'] = API_1484_11;
	    },
	    log: function (message, data) {
	        SCORM.message(message, 'white', data);
	    },
	    success: function (message, data) {
	        SCORM.message('✓ ' + message, 'green', data);
	    },
	    info: function (message, data) {
	        SCORM.message(message, 'blue', data);
	    },
	    error: function (message, data) {
	        SCORM.message(message, 'red', data);
	    },
	    message: function (message, color, data) {
	        console.log(message, data);
	    },
	    set: function (obj) {
	        _data = _.defaults(obj, _data);
	    },
	    get: function (key) {
	        if(key) {
	            return _data[key];
	        }
	        return _data;
	    }
	}

	module.exports = SCORM;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var SCORMDefaults = {
	    "cmi._version": undefined,
	    "cmi.comments_from_learner._children": undefined,
	    "cmi.comments_from_learner._count": undefined,
	    "cmi.comments_from_learner.n.comment": undefined,
	    "cmi.comments_from_learner.n.location": undefined,
	    "cmi.comments_from_learner.n.timestamp": undefined,
	    "cmi.comments_from_lms._children": undefined,
	    "cmi.comments_from_lms._count": undefined,
	    "cmi.comments_from_lms.n.comment": undefined,
	    "cmi.comments_from_lms.n.location": undefined,
	    "cmi.comments_from_lms.n.timestamp": undefined,
	    "cmi.completion_status": undefined,
	    "cmi.completion_threshold": undefined,
	    "cmi.credit": undefined,
	    "cmi.entry": undefined,
	    "cmi.exit": undefined,
	    "cmi.interactions._children": undefined,
	    "cmi.interactions._count": undefined,
	    "cmi.interactions.n.id": undefined,
	    "cmi.interactions.n.type": undefined,
	    "cmi.interactions.n.objectives._count": undefined,
	    "cmi.interactions.n.objectives.n.id": undefined,
	    "cmi.interactions.n.timestamp": undefined,
	    "cmi.interactions.n.correct_responses._count": undefined,
	    "cmi.interactions.n.correct_responses.n.pattern": undefined,
	    "cmi.interactions.n.weighting": undefined,
	    "cmi.interactions.n.learner_response": undefined,
	    "cmi.interactions.n.result": undefined,
	    "cmi.interactions.n.latency": undefined,
	    "cmi.interactions.n.description": undefined,
	    "cmi.launch_data": undefined,
	    "cmi.learner_id": undefined,
	    "cmi.learner_name": undefined,
	    "cmi.learner_preference._children": undefined,
	    "cmi.learner_preference.audio_level": undefined,
	    "cmi.learner_preference.language": undefined,
	    "cmi.learner_preference.delivery_speed": undefined,
	    "cmi.learner_preference.audio_captioning": undefined,
	    "cmi.location": undefined,
	    "cmi.max_time_allowed": undefined,
	    "cmi.mode": undefined,
	    "cmi.objectives._children": undefined,
	    "cmi.objectives._count": undefined,
	    "cmi.objectives.n.id": undefined,
	    "cmi.objectives.n.score._children": undefined,
	    "cmi.objectives.n.score.scaled": undefined,
	    "cmi.objectives.n.score.raw": undefined,
	    "cmi.objectives.n.score.min": undefined,
	    "cmi.objectives.n.score.max": undefined,
	    "cmi.objectives.n.success_status": undefined,
	    "cmi.objectives.n.completion_status": undefined,
	    "cmi.objectives.n.progress_measure": undefined,
	    "cmi.objectives.n.description": undefined,
	    "cmi.progress_measure": undefined,
	    "cmi.scaled_passing_score": undefined,
	    "cmi.score._children": undefined,
	    "cmi.score.scaled": undefined,
	    "cmi.score.raw": undefined,
	    "cmi.score.min": undefined,
	    "cmi.score.max": undefined,
	    "cmi.session_time": undefined,
	    "cmi.success_status": undefined,
	    "cmi.suspend_data": undefined,
	    "cmi.time_limit_action": undefined,
	    "cmi.total_time": undefined
	};

	module.exports = SCORMDefaults;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var config = {
	    'cmi.learner_name': 'Derek Tibs',
	    'cmi.core.student_name': 'Derek Tibs',
	    'cmi.learner_id': '123456789',
	    'cmi.suspend_data': 'asdasd',
	    'cmi.completion_status': 'incomplete'
	};
	module.exports = config;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	var React = __webpack_require__(1);
	var _ = __webpack_require__(3);
	var Grid = __webpack_require__(11);
	var Col = __webpack_require__(10);
	var Input = __webpack_require__(12);
	var Textarea = __webpack_require__(14);
	var Button = __webpack_require__(9);

	var SCORM = __webpack_require__(5);
	var SCORMDefaults = __webpack_require__(6);
	var configVars = __webpack_require__(7);

	var SCORMCompliance = React.createClass({
	    displayName: 'SCORMCompliance',
	    mixins: [
	        __webpack_require__(15)
	    ],
	    getDefaultProps: function () {
	        var data = _.defaults(configVars, SCORMDefaults);
	        return {
	            badData: false,
	            formData: {
	                module: 'demo',
	                scorm_text: data,
	                scorm_data: data
	            }
	        };
	    },
	    getInitialState: function () {
	        return {
	            module: undefined,
	            inputModule: undefined,
	            log: []
	        };
	    },
	    componentWillMount: function () {
	        SCORM.initialize();
	        SCORM.set(this.state.formData.scorm_data);
	        SCORM.message = this.log;
	    },
	    componentWillUpdate: function (nextProps, nextState) {
	        SCORM.set(nextState.formData.scorm_data);  
	    },
	    log: function (a,b,data) {
	        var color = b || 'white';
	        
	        var _data = (data) ? " => " + data : '';

	        this.setState({log: this.state.log.concat({
	            message: a + _data,
	            color: color
	        })}); 
	        this.refs.console.getDOMNode().scrollTop = this.refs.console.getDOMNode().scrollHeight;
	    },
	    loadModule: function () {
	        this.setState({module: this.state.formData.module});
	    },
	    reloadModule: function () {
	        this.refs.iframe.getDOMNode().contentWindow.location.reload();
	    },
	    onTextAreaChange: function (e, data) {
	        this.FormMixin_onFormChange(e, {
	            key: data.key, 
	            value: _data
	        });
	        try {
	            var _data = JSON.parse(data.value);
	            this.setState({
	                formData: {
	                    scorm_data: _data,
	                },
	                badData: false
	            });
	            
	        } catch (error){
	            this.setState({badData: true});
	        }

	    },
	    render: function () {
	        var formData = this.state.formData;
	        var url;
	        if(this.state.module) {
	            url = (this.state.module.indexOf('http') != -1) ? this.state.module : "__MODULES__/" + this.state.module;            
	        }
	        var buttons = (
	            React.DOM.div(null, 
	                Button({onClick: this.loadModule}, "Load"), 
	                Button({modifier: "grey", onClick: this.reloadModule}, "Refresh")
	            )
	        );
	        var button = (this.state.badData) ? Button({onClick: this.loadModule, disabled: true}, "Bad Data") : buttons;

	        return (
	            React.DOM.div({className: "SCORMCompliance"}, 
	                React.DOM.div({className: "module"}, 
	                    React.DOM.iframe({ref: "iframe", src: url})
	                ), 
	                React.DOM.div({className: "content padding2"}, 
	                    React.DOM.div({className: "row"}, 
	                        React.DOM.label(null, "Module URL"), 
	                        Input({name: "module", onChange: this.FormMixin_onFormChange, value: formData['module']}), 
	                        
	                        React.DOM.label(null, "User Data"), 
	                        Textarea({name: "scorm_text", onChange: this.onTextAreaChange, value: JSON.stringify(formData.scorm_text, null, 2), height: 240})
	                    ), 

	                        

	                    button
	                    



	                ), 
	                React.DOM.pre({className: "console", ref: "console"}, this.renderLog(this.state.log))
	            )
	        );
	    },
	    renderLog: function (logs) {
	        return _.map(logs, function (log, key){
	            return React.DOM.div({className: "log-" + log.color, key: key}, log.message);
	        });
	    }
	});

	module.exports = SCORMCompliance;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */

	/**
	 * Button
	 *
	 * @param {String} example  <div>
	        <Button>Button</Button>
	        <Button color="hero">Button</Button>
	        <Button color="blue">Button</Button>
	        <Button color="aqua">Button</Button>
	        <Button color="green">Button</Button>
	        <Button color="red">Button</Button>
	        <Button color="grey">Button</Button>
	    </div>
	    <div>
	        <Button isRound>B</Button>
	        <Button color="hero" isRound>B</Button>
	        <Button color="blue" isRound>B</Button>
	        <Button color="aqua" isRound>B</Button>
	        <Button color="green" isRound>B</Button>
	        <Button color="red" isRound>B</Button>
	        <Button color="grey" isRound>B</Button>
	    </div>

	 */
	var React = __webpack_require__(1);
	var ClassMixin = __webpack_require__(2);

	var Button = React.createClass({
	    displayName: 'Button',
	    mixins: [ClassMixin],
	    propTypes: {
	        color: React.PropTypes.string,
	        // component: React.PropTypes.component, //Has some validation issues
	        onClick: React.PropTypes.func,
	        toggle: React.PropTypes.bool,
	        checked: React.PropTypes.bool
	    },
	    getDefaultProps: function () {
	        return {
	            component: React.DOM.div,
	            toggle: false,
	            checked: false
	        };
	    },
	    getInitialState: function() {
	        return {
	            checked: this.props.checked
	        };
	    },
	    onClick: function(e) {
	        var state;

	        if (this.props.toggle) {
	            state = { checked: !this.state.checked };
	            this.setState(state);
	        }

	        if (this.props.onClick) {
	            this.props.onClick(e, state);
	        }
	    },
	    render: function() {
	        // Check for link
	        if(this.props.href){
	            this.props.component = React.DOM.a;
	        }

	        var classes = this.ClassMixin_getClass()
	                            .modifier(this.props.color);


	        if (this.props.toggle && !this.state.checked) {
	            classes.modifier('grey');
	        }

	        return this.transferPropsTo(
	            this.props.component({
	                className: classes.className,
	                onClick: this.onClick
	            },this.props.children)
	        );
	    }
	});

	module.exports = Button;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	var React = __webpack_require__(1);
	var Col = React.createClass({
	    displayName: 'Col',
	    propTypes: {
	        width: React.PropTypes.number
	    },
	    render: function() {
	        return this.transferPropsTo(  
	            React.DOM.div({className: this.props.width ? 'col--'+this.props.width : 'col--'}, this.props.children)
	        );
	    }
	});

	module.exports = Col;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	var React = __webpack_require__(1);
	var ClassBuilder = __webpack_require__(4);

	var Grid = React.createClass({
	    displayName: 'Grid',
	    propTypes:{
	    	modifier: React.PropTypes.string
	    },
	    render: function() {
	    	var classes = new ClassBuilder('grid')
	    		.modifier(this.props.modifier)
	    	;

	        return this.transferPropsTo(  
	        	React.DOM.div({className: classes.className}, this.props.children)
	        );
	    }
	});

	module.exports = Grid;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	/**
	 * Input
	 *
	 * @param   {String} example  <p> <Input value="Valid Text Input" /> <Input value="Invalid Text Input" isValid={false} /> </p>
	 */
	var React = __webpack_require__(1);
	var ClassMixin = __webpack_require__(2);
	var Label = __webpack_require__(13);

	var Input = React.createClass({
	    displayName: 'Input',
	    mixins: [ClassMixin],
	    propTypes: {
	        value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
	        onChange: React.PropTypes.func,
	        onFocus: React.PropTypes.func,
	        readOnly: React.PropTypes.bool,
	        isValid: React.PropTypes.bool,
	        label: React.PropTypes.string
	    },
	    getDefaultProps: function() {
	        return {
	            grey: false,
	            isValid: true,
	            readOnly: false
	        };
	    },
	    getDetails: function() {
	        return {
	            key: this.props.name,
	            value: this.refs.input.getDOMNode().value
	        };
	    },
	    onChange: function(e) {
	        if (this.props.onChange) {
	            this.props.onChange(e, this.getDetails());
	        }
	    },
	    onFocus: function(e) {
	        if (this.props.onFocus) {
	            this.props.onFocus(e, this.getDetails());
	        }
	    },
	    onBlur: function(e) {
	        if (this.props.onBlur) {
	            this.props.onBlur(e, this.getDetails());
	        }
	    },
	    onKeyUp: function(e) {
	        if (this.props.onKeyUp) {
	            this.props.onKeyUp(e, this.getDetails());
	        }
	        else if (e.keyCode === 27) {
	            // Stop Esc key from closing modal's
	            e.stopPropagation();
	            this.getDOMNode().blur();
	        }
	    },
	    render: function() {
	        var classes = this.ClassMixin_getClass()
	            .add((this.props.isValid === false || this.props.error), 'is-error')
	        ;
	        var disabled = this.props.disabled || false;

	        var label, error;

	        if (this.props.error) {
	            error = React.DOM.div({className: "Input_error"}, this.props.error);
	        }

	        if (this.props.label) {
	            label = Label({htmlFor: this.props.name}, this.props.label);
	        }

	        return (
	            React.DOM.div(null, 
	                label, 
	                React.DOM.input({
	                    disabled: disabled, 
	                    ref: "input", 
	                    className: classes.className, 
	                    placeholder: this.props.placeholder, 
	                    readOnly: this.props.readOnly, 
	                    name: this.props.name, 
	                    type: this.props.type, 
	                    checked: this.props.checked, 
	                    onChange: this.onChange, 
	                    onFocus: this.onFocus, 
	                    onBlur: this.onBlur, 
	                    onKeyUp: this.onKeyUp, 
	                    onKeyDown: this.props.onKeyDown, 
	                    value: this.props.value}
	                ), 
	                error
	            )           
	        );
	    }
	});

	module.exports = Input;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	var React = __webpack_require__(1);
	var ClassMixin = __webpack_require__(2);

	var Label = React.createClass({
	    displayName: 'Label',
	    mixins: [ClassMixin],
	    render: function() {
	        var classes = this.ClassMixin_getClass();
	        return React.DOM.label({className: classes.className, htmlFor: this.props.htmlFor}, this.props.children);
	    }
	});

	module.exports = Label;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	var React = __webpack_require__(1);
	var ClassMixin = __webpack_require__(2);

	var Textarea = React.createClass({
	    displayName: 'Textarea',
	    mixins: [ClassMixin],
	    propTypes: {
	        placeholder: React.PropTypes.string,
	        value: React.PropTypes.string,
	        ref: React.PropTypes.string,
	        onChange: React.PropTypes.func
	    },
	    // shouldComponentUpdate: function(nextProps) {
	    //     if (!nextProps.value || nextProps.value !== this.lastValue) {
	    //         return true;
	    //     }

	    //     return false;
	    // },
	    getSelection: function(el) {
	        var start, end;
	        if (window.getSelection) {
	            try {
	                start = el.selectionStart;
	                end = el.selectionEnd;

	            } catch (e) {
	                console.log('Cant get selection text');
	            }
	        } 
	        // For IE
	        if (document.selection && document.selection.type !== "Control") {
	            return document.selection.createRange().text;
	        }

	        return {
	            start: start,
	            end: end,
	            length: end - start
	        };
	    },
	    onChange:function(e){
	        this.lastValue = this.refs.text.getDOMNode().value;
	        if (this.props.onSelection) {
	            this.onSelection();
	        }
	        if (this.props.onChange) {
	            this.props.onChange(e, {
	                key: this.props.name,
	                value: this.lastValue
	            });
	        }
	    },
	    onSelection: function () {
	        this.props.onSelection(this.getSelection(this.refs.text.getDOMNode()));
	    },
	    onKeyUp: function(e) {
	        if (e.keyCode === 27) {
	            // Stop Esc key from closing modal's
	            e.stopPropagation();
	            this.getDOMNode().blur();
	        }

	        this.onChange(e);
	    },
	    render: function() {
	        var error;

	        if (this.props.error) {
	            error = React.DOM.div({className: "Input_error"}, this.props.error);
	        }

	        var classes = this.ClassMixin_getClass()
	            .add((this.props.isValid === false || this.props.error), 'is-error')
	        ;

	        return (
	            React.DOM.div(null, 
	                this.transferPropsTo(React.DOM.textarea({
	                    className: classes.className, 
	                    ref: "text", 
	                    placeholder: this.props.placeholder, 
	                    value: this.props.value, 
	                    onMouseUp: this.onChange, 
	                    onChange: this.onChange, 
	                    onKeyUp: this.onKeyUp, 
	                    defaultValue: this.props.value
	                    }
	                )), 
	                error
	            )
	        );
	    }
	});

	module.exports = Textarea;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	var _ = __webpack_require__(3);

	var FormMixin = {
		getInitialState: function() {
	        var formData = _.cloneDeep(this.props.formData || {});
	        var formErrors = this.props.formData ? this.FormMixin_validateAll(formData) : {};

	        return {
	            formData: formData,
	            formErrors: formErrors
	        };
	    },
	    FormMixin_onFormChange: function(e, details) {
	        var formData = this.state.formData,
	            formErrors = this.state.formErrors || {};

	        formData[details.key] = details.value;

	        // Validate field
	        if (this.validators) {
	            formErrors[details.key] = this.FormMixin_validate(details.key, details.value);
	        }

	        this.setState({formData: formData, formErrors: formErrors});
	    },
	    FormMixin_validateAll: function(formData) {
	        var formErrors = {};

	        formData = formData || this.state.formData;

	        if (this.validators) {
	            for (var key in this.validators) {
	                if (this.validators[key]) {
	                    formErrors[key] =  this.FormMixin_validate(key, formData[key]);
	                }
	            }
	        }

	        this.setState({formErrors: formErrors});

	        return formErrors;
	    },
	    FormMixin_validate: function(key, value) {
	        if (this.validators && key && this.validators[key]) {
	            return this.validators[key](value, this);
	        }

	        return null;
	    },
	    FormMixin_isValid: function() {
	        if (this.validators) {
	            var formErrors = this.FormMixin_validateAll();

	            for (var key in formErrors) {
	                // If any field is not valid, return false
	                if (formErrors[key] !== undefined && formErrors[key] !== null && formErrors[key] !== true) { return false; }
	            }
	        }

	        return true;
	    },
	    FormMixin_getData: function() {
	        var data = _.clone(this.state.formData);

	        if (this.transformData) {
	            for (var key in this.transformData) {
	                if (this.transformData.hasOwnProperty(key)) {
	                    data[key] = this.transformData[key] ? this.transformData[key](data[key]) : data[key];
	                }
	            }
	        }

	        return data;
	    },
	    FormMixin_updateState: function (formData) {
	        this.setState({formData: formData, formErrors: {}});
	        this.FormMixin_validateAll(formData);
	    }
	};

	module.exports = FormMixin;


/***/ }
]);