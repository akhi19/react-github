import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'


const Component = React.Component

class App extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      s : false,
      users : [],
      url : [],
      avatar: []
    }
  }
  render() {
    return (
      <div>
        <SearchBox fetchUser={this.fetchUser.bind(this)}/>
        <Card data={this.state} />
      </div>
    )
  }
  
  // the api request function
 fetchApi(url) {
    
     fetch(url)
      .then((res) => res.json() )
      .then((data) => {
        
        // update state with API data
          var user = {}   
        this.setState({
            s : true,
            users: data.items.map(item=>{return item.login}),
            avatar: data.items.map(item=>{return item.avatar_url}),
            url: data.items.map(item=>{return item.html_url})
            
        })
      })
      .catch((err) => console.log(err) )
  }
  
   fetchUser(username) {
    let url = `https://api.github.com/search/users?q=${username}`
    if(username=="")
      {
        this.setState({
          s: false,
          users: [],
          url:[],
          avatar:[]
        })
      }else{
         this.fetchApi(url)
      }
  }
}

class SearchBox extends Component {
  render() {
    return (
      <form 
        className="searchbox" >
        <input
          ref="search"
          className="searchbox__input" 
          type="text" 
          onChange={this.handleChange.bind(this)}
          placeholder="type username..."/>
      </form>
    )
  }
  
  // handleClick(e) {
  //   e.preventDefault()
  //   let username = this.refs.search.getDOMNode().value
  //   // sending the username value to parent component to fetch new data from API
  //   this.props.fetchUser(username)
  //   this.refs.search.getDOMNode().value = ''
  // }
  handleChange(e) {
    e.preventDefault()
      let username = e.target.value
      // sending the username value to parent component to fetch new data from API
      this.props.fetchUser(username)
  }
};
                              
class Card extends Component {
  render() {
    let data = this.props.data
    if (data.users.length==0 && data.s == true) {
      // when username is not found...
      return (<div><center>No users found</center></div>)
    } else {
      // if username found, then...
      return (
        <div>
          <ul>
              {data.users.map((items) => <li>
                                <img src ={data.avatar[data.users.indexOf(items)]} height="42" width="42"/>    
                                <a href={data.url[data.users.indexOf(items)]}>{items}</a>
                              </li>)}
          </ul>
        </div>
        )
    }
  }
}
ReactDOM.render(<App />, document.getElementById('app'))