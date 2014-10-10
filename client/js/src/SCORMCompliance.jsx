/** @jsx React.DOM */
var React = require('react');
var _ = require('lodash');
var Grid = require('stampy/components/Grid');
var Col = require('stampy/components/Col');
var Input = require('stampy/components/Input');
var Button = require('stampy/components/Button');

var SCORM = require('./utils/SCORM.js');




var SCORMCompliance = React.createClass({
    displayName: 'SCORMCompliance',
    mixins: [
        require('stampy/mixins/FormMixin')
    ],
    getDefaultProps: function () {
        return {
            formData: {
                'cmi.learner_name': 'Derek Tibs',
                'cmi.learner_id': '123456789',
                'cmi.completion_status': 'incomplete'
            }
        };
    },
    getInitialState: function () {
        return {
            module: undefined,
            inputModule: undefined
        };
    },
    componentWillMount: function () {
        SCORM.initialize();
        SCORM.set(this.state.formData);
    },
    onChangeInput: function (e) {
        this.setState({inputModule: e.target.value});
    }, 
    loadModule: function () {
        this.setState({module: this.state.inputModule});
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
                <iframe ref="iframe" className="module" src={url}></iframe>
                <div className="content padding2">
                    <p>Module URL</p>
                    <div className="row">
                        <input className="Input" onChange={this.onChangeInput}></input>
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
            </div>
        );
    }
});

module.exports = SCORMCompliance;
