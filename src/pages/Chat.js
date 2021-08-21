import React, { Component } from 'react';
import { auth ,db ,storage, } from "../services/firebase";
import Moment from 'react-moment'
import './Chat.css';
// Icons
import { MdMoreVert } from 'react-icons/md';
import defaultAvatarUrl from '../assets/avatar.png';

class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: auth().currentUser,
            chats: [],
            imageUrl: "",
            content: "",
            readError: null,
            writeError: null,
            showMenu: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this)
        this.onFileChange = this.onFileChange.bind(this);    }

async componentDidMount() {
    this.setState({readError: null});

    try {
        db.ref("chats").on("value", snapshot => {
            let chats = [];

            snapshot.forEach((snap) => {
                chats.push(snap.val());
            });

            this.setState({chats});
        });
    }
    catch(error) {
        this.setState({error: error.message});
    }
}

handleChange(event) {
    this.setState({content: event.target.value});
}

async handleSubmit(event) {
    event.preventDefault();

    this.setState({withError: null});
      try {
        
          await db.ref("chats").push({
              imageUrl: "",
              message: this.state.content,
              senderId: this.state.user.uid,
              timestamp: Date.now(),
          });
        this.setState({content: ''});

      }
      catch(error) {
        this.setState({writeError: error.message});
      }
    
}

async onFileChange(event) {
  event.preventDefault();
  this.setState({withError: null});
  const image = event.target.files[0];
  console.log(image);
  const time = parseInt(Date.now()).toString();
  console.log(time);
  try{
      const path = storage.ref("chats").child(time);
      await path.put(image);
      path.getDownloadURL().then(url =>{
      console.log(url);
      this.setState({imageUrl: url});
      db.ref("chats").push({
        imageUrl: this.state.imageUrl,
        message: "Photo",
        senderId: this.state.user.uid,
        timestamp: Date.now(),
    });
      this.setState({imageUrl: ''});
    });
  }
  catch(error) {
    this.setState({writeError: error.message});
  }
}


logout() {
    auth().signOut()
}

toggleMenu() {
    this.setState({showMenu: !this.state.showMenu});
}

render() {
    const { user, chats, content, showMenu } = this.state;
    // console.log(user);
    const displayName = user.displayName ? user.displayName : user.email;
    const avatarUrl = user.photoURL ? user.photoURL : defaultAvatarUrl;
    return (
      <div className="chat-window">
        {/* User Info header */}
        <header className="user-info">
          <div className="user-avatar">
            <div
              className="d1"
              style={{
                height: '40px',
                width: '40px',
              }}
            >
              <img
                src={avatarUrl}
                alt=""
                draggable="false"
                className="user-avatar-img"
              />
            </div>
          </div>
          <div className="display-name" role="button">
            <div className="d1">
              <div className="d2">
                <span title={displayName} className="s3">
                  {displayName}
                </span>
              </div>
            </div>
          </div>
          <div className="user-actions">
            <div className="d1">
              <div className="d2">
                <div role="button" title="Menu" onClick={this.toggleMenu}>
                  <span>
                    <MdMoreVert />
                  </span>
                </div>
                <span>
                  {showMenu && (
                    <div
                      className="d3"
                      tabIndex="-1"
                      style={{
                        transformOrigin: 'right top',
                        transform: 'scale(1)',
                        opacity: 1,
                      }}
                    >
                      <ul className="u1">
                        <li className="l1" tabIndex="-1">
                          <div
                            className="d4"
                            role="button"
                            onClick={this.logout}
                          >
                            Logout
                          </div>
                        </li>
                      </ul>
                    </div>
                  )}
                </span>
              </div>
            </div>
          </div>
        </header>
        {/* Chat messages */}
        <div className="chat-messages">
          <div className="da1" tabIndex="0">
            <div className="da2"></div>
            <div className="dc3" tabIndex="-1" rol="region">
              {chats.map((chat) => {
                if(chat.imageUrl === ""){
                return (
                  <div
                    className={`chat-message focusable-list-item ${
                      chat.senderId === user.uid ? 'message-out' : 'message-in'
                    }`}
                    key={chat.timestamp}
                  >
                    <div className="message-container">
                      <div className="chat-wrap">
                        <div className="chat-container">
                          <div className="copyable-text">
                            <div className="dab1">
                              <span className="message-text selectable-text invisible-space">
                                <span>{chat.message}</span>
                              </span>
                              <span className="extra-space"></span>
                            </div>
                          </div>
                          <div className="message-time">
                            <div className="db1">
                              <span dir="auto" className="sb1">
                                <Moment fromNow>{chat.timestamp}</Moment>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              else{
                return (
                  <div
                    className={`chat-message focusable-list-item ${
                      chat.senderId === user.uid ? 'message-out' : 'message-in'
                    }`}
                    key={chat.timestamp}
                  >
                    <div className="message-container">
                      <div className="chat-wrap">
                        <div className="chat-container">
                          <div className="copyable-text">
                            <div className="dab1">
                              <span className="message-text selectable-text invisible-space">
                                <img src={chat.imageUrl} width="200px" height="200"></img>
                              </span>
                              <span className="extra-space"></span>
                            </div>
                          </div>
                          <div className="message-time">
                            <div className="db1">
                              <span dir="auto" className="sb1">
                                <Moment fromNow>{chat.timestamp}</Moment>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              })}
            </div>
          </div>
        </div>
        {/* Error Messages */}
        <div className="write-error">
          {this.state.writeError ? (
            <div className="error">{this.state.writeError}</div>
          ) : null}
        </div>

        {/* Chat form */}
        <footer className="chat-form">
          <form onSubmit={this.handleSubmit} action="submit">
          <div className="row">
            <div className="col-8">
            <div className="input-wrap">
               <input
                type="text"
                onChange={this.handleChange}
                value={content}
                className="chat-input"
              /> 
            </div>
            </div>
            
            <div className="col-2 ml-4">
              <label ></label>
            <input type="file" placeholder="get" accept="image/*" onChange={this.onFileChange}/>
            </div>
          </div>
          </form>
        </footer>
      </div>
    );
  }
}


export default Chat;
