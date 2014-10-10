/** @jsx React.DOM */
var React = require('react');
var _ = require('lodash');
var Grid = require('stampy/components/Grid');
var Col = require('stampy/components/Col');
var Input = require('stampy/components/Input');
var Button = require('stampy/components/Button');

var SCORM = require('./utils/SCORM.js');
var SCORMDefaults = require('./utils/SCORMDefaults.js');
var configVars = require('../../../config.js');

var defaultVars = _.defaults(configVars, SCORMDefaults);




var SCORMCompliance = React.createClass({
    displayName: 'SCORMCompliance',
    mixins: [
        require('stampy/mixins/FormMixin')
    ],
    getDefaultProps: function () {
        return {
            formData: _.defaults(defaultVars, {
                module: 'demo'
            })
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
        console.log(this.state.formData);
        SCORM.set(this.state.formData);
        SCORM.message = this.log;
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
    render: function () {
        var formData = this.state.formData;
        var url;
        if(this.state.module) {
            url = (this.state.module.indexOf('http') != -1) ? this.state.module : "__MODULES__/" + this.state.module;            
        }

        return (
            <div className="SCORMCompliance">
                <div className="module" >
                    <iframe ref="iframe" src={url}></iframe>
                </div>
                <div className="content padding2">
                    <p>Module URL</p>
                    <div className="row">
                        <Input name="module" onChange={this.FormMixin_onFormChange} value={formData['module']}/>
                        <Button onClick={this.loadModule}>Load</Button>
                        <Button modifier="grey" onClick={this.reloadModule}>Refresh</Button>
                    </div>


                    <h2>User Data</h2>

                    <label>Learner Name</label>
                    <Input name="cmi.learner_name" onChange={this.FormMixin_onFormChange} value={formData['cmi.learner_name']}/>

                    <label>Learner ID</label>
                    <Input name="cmi.learner_id" onChange={this.FormMixin_onFormChange} value={formData['cmi.learner_id']}/>

                    <label>Completion Status</label>
                    <Input name="cmi.completion_status" onChange={this.FormMixin_onFormChange} value={formData['cmi.completion_status']}/>

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
