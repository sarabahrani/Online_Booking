import React from 'react';
 class Lable extends React.Component{
     render(){
         return(
             <lable htmlFor={this.props.name} >
             {this.props.name}: 
              </lable>
         );
     }
 }
 export default Lable;