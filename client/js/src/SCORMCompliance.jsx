/** @jsx React.DOM */
var React = require('react');
var _ = require('lodash');
var Grid = require('stampy/components/Grid');
var Col = require('stampy/components/Col');
var Input = require('stampy/components/Input');
var Textarea = require('stampy/components/Textarea');
var Button = require('stampy/components/Button');

var SCORM = require('./utils/SCORM.js');
var SCORMDefaults = require('./utils/SCORMDefaults.js');
var configVars = require('../../../config.js');

var SCORMCompliance = React.createClass({
    displayName: 'SCORMCompliance',
    mixins: [
        require('stampy/mixins/FormMixin')
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
            <div>
                <Button onClick={this.loadModule}>Load</Button>
                <Button modifier="grey" onClick={this.reloadModule}>Refresh</Button>
            </div>
        );
        var button = (this.state.badData) ? <Button onClick={this.loadModule} disabled>Bad Data</Button> : buttons;

        return (
            <div className="SCORMCompliance">
                <div className="module" >
                    <iframe ref="iframe" src={url}></iframe>
                </div>
                <div className="content padding2">
                    <div className="row">
                        <label>Module URL</label>
                        <Input name="module" onChange={this.FormMixin_onFormChange} value={formData['module']}/>
                        
                        <label>User Data</label>
                        <Textarea name="scorm_text" onChange={this.onTextAreaChange} value={JSON.stringify(formData.scorm_text, null, 2)} height={240}></Textarea>
                    </div>

                        

                    {button}
                    



                </div>
                <pre className="console" ref="console">{this.renderLog(this.state.log)}</pre>
            </div>
        );
    },
    renderLog: function (logs) {
        return _.map(logs, function (log, key){
            return <div className={"log-" + log.color} key={key}>{log.message}</div>;
        });
    }
});

module.exports = SCORMCompliance;
