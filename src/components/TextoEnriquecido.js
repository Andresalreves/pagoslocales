import React, {Component} from 'react';
import RichTextEditor from 'react-rte';

const toolbarConfig = {
    // Optionally specify the groups to display (displayed in the order listed).
    display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS', 'BLOCK_TYPE_DROPDOWN', 'HISTORY_BUTTONS'],
    INLINE_STYLE_BUTTONS: [
      {label: 'Bold', style: 'BOLD', className: 'custom-css-class'},
      {label: 'Italic', style: 'ITALIC'},
      {label: 'Underline', style: 'UNDERLINE'}
    ],
    BLOCK_TYPE_DROPDOWN: [
      {label: 'Normal', style: 'unstyled'},
      {label: 'H1', style: 'header-one'},
      {label: 'H2', style: 'header-two'},
      {label: 'H3 Small', style: 'header-three'},
      {label: 'Rosa pagoslocales', style: 'header-pl'}
    ],
    BLOCK_TYPE_BUTTONS: [
      {label: 'UL', style: 'unordered-list-item'},
      {label: 'OL', style: 'ordered-list-item'}
    ]
  };

class MyStatefulEditor extends Component {


  state = {
    value: RichTextEditor.createEmptyValue(),
    data:false
  }

  onChange = (value) => {
    this.setState({value});
    if (this.props.setInputs) {

      let inputs_                   = {...this.props.inputs}
          inputs_[this.props.name]  =   value.toString('html')
          this.props.setInputs(inputs_)
    }

  };

  componentDidMount() {
    if(this.props.defaultValue!==undefined){
      this.setState({value:RichTextEditor.createValueFromString(this.props.defaultValue, 'html')})
    }
  }

  componentDidUpdate(){
    if(this.props.defaultValue!==undefined && !this.state.data){
      this.setState({value:RichTextEditor.createValueFromString(this.props.defaultValue, 'html'),data:true})
    }
  }



  render () {
    return (
      <RichTextEditor
        className={this.props.className}
        placeholder={this.props.placeholder}
        value={this.state.value}
        onChange={this.onChange}
        toolbarConfig={toolbarConfig}
      />
    );
  }
}

export default MyStatefulEditor
