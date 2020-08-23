import React from "react";
import Select from "react-select";
import categories from "../../categories";
// import cities from "../../cities";
// import axios from "axios";
import { isNullable } from "../../utils/null-checks";
// import { render } from "react-dom";

const CategorySelector = ({
  onChange,
  className,
  isClearable,
  defaultValue,
}) => {
  const defaultLabel = isNullable(defaultValue)
    ? null
    : categories.find((category) => category.value === defaultValue);

  return (
    <Select
      isSearchable
      isClearable={isClearable}
      placeholder="What are you looking for?"
      onChange={onChange}
      options={categories}
      className={className}
      defaultValue={defaultLabel}
    />
  );
};

export default CategorySelector;

// export default class CategorySelector extends Component {

//     constructor(props){
//       super(props)
//       this.state = {
//         selectOptions : [],
//         id: "",
//         type: ''
//       }
//     }

//    async getOptions(){
//       const res = await axios.get('https://reference.craigslist.org/Categories')
//       const data = res.data

//       const options = data.map(d => ({
//         "value" : d.id,
//         "label" : d.type

//       }))

//       this.setState({selectOptions: options})

//     }

//     handleChange(e){
//      this.setState({id:e.value, name:e.label})
//     }

//     componentDidMount(){
//         this.getOptions()
//     }

//     render() {
//       console.log(this.state.selectOptions)
//       return (
//         <div>
//           <Select options={this.state.selectOptions} onChange={this.handleChange.bind(this)}
//           placeholder='What are you looking for?'/>
//             <p><strong>{this.state.name}</strong> <strong>{this.state.id}</strong></p>
//         </div>
//       )
//     }
//   }
