import './App.css';
import React, { Component } from 'react'
import Timeline from '@daptiv/react-visjs-timeline'
import logo from './logo.svg';
import Popover from 'material-ui/Popover'
import moment from 'moment'


class App extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      pOpen: false,
      anchorPosition: {top: 0, left: 0},
      m: {},
    }
  }
  render() {
    const options = {
      align: 'left',
      width: '100%',
      minHeight: '96px',
      maxHeight: '96px',
      stack: false,
      showMajorLabels: false,
      showMinorLabels: true,
      showCurrentTime: true,
      zoomMax: 63072000000, // max zoom of 2 years
      zoomMin: 1002000000, // min zoom of 11 (ish) days
      // zoomMin: 604800000, // min zoom of 7 days
      moveable: true,
      verticalScroll: false,
      horizontalScroll: true,
      zoomable: false,
      //type: 'background',
      type: 'box',

      format: {
      //   majorLabels: {
      //     month: 'MM',
      //     year: 'YYYY',
      //   },
        minorLabels: {
          day: 'D MMM YY',
          month: 'MMM YY'
      //     year: 'YY',
      //     month: 'MM',
      //     minute: 'h:mma',
      //     hour: 'ha',
        }
      },
      // template: (item, element, data) => {
      //
      //   const template = ReactDOM.render(<Milestone item={item} />, element)
      //
      //   return ''
      //   // return ReactDOM.render(<Milestone />, element)
      // }
    }

    const clicked = (e) => {
      // this.setState({anchorPosition: {left: e.clientX, top: e.clientY}, pOpen: true})
      // console.log(`clientx: ${e.clientX}, clienty: ${e.clientY}`)
      // console.dir(e)
    }
    const milestones = [
      {
        id: 'a',
        date: new Date(2018, 3, 15),
        title: 'Milestone 1',
        state: 'in-progress',
        clicked,
      },
      {
        id: 'b9',
        date: new Date(2018, 3, 20),
        title: 'Milestone 2',
        state: 'not-started',
        clicked,
      },
      {
        id: 'b28',
        date: new Date(2018, 4, 11),
        title: 'Milestone 3',
        state: 'overdue',
        clicked,
      },
      {
        id: 'b27',
        date: new Date(2018, 6, 12),
        title: 'Milestone 4',
        state: 'in-progress',
        clicked,
      },
      {
        id: 'b26',
        date: new Date(2018, 3, 11),
        title: 'Milestone 5',
        state: 'not-started',
        clicked,
      },
      {
        id: 'b24',
        date: new Date(2018, 3, 27),
        title: 'Milestone 6',
        state: 'not-started',
        clicked,
      },
      {
        id: 'b23',
        date: new Date(2018, 2, 11),
        title: 'Milestone 7',
        state: 'overdue',
        clicked,
      },
    ]

    const getStyle = (st) => {
      switch(st) {
        case 'not-started':
          return 'color: #ccc !important;'//' background-color: rgba(0,0,0,.5);'
        case 'in-progress':
          return 'color: #ccc !important;'//' background-color: blue;'
        case 'overdue':
          return 'color: #ccc !important;'//' background-color: red;'
        default:
          return 'color: #ccc !important;'//' background-color: #fff;'
      }
    }
    const items = milestones.map(m => {
      const style = null; //getStyle(m.state)
      return {
        milestone: m,
        start: m.date,
        id: m.id,
        style: style,
        content: '<div class="m-sum-title">' + m.title + '</div><div class="m-sum-date">' + moment(m.date).format('DD-MM-YYYY') + '</div>',
      }
    })
    // const items = [
    //   {
    //     start: new Date(2018, 3, 13),
    //     // end: new Date(2018, 3, 14),  // end is optional
    //
    //     title: 'Milestone1',
    //   },{
    //     start: new Date(2018, 3, 17),
    //     // end: new Date(2018, 3, 18),
    //     content: 'function A',
    //   },{
    //     start: new Date(2018, 3, 14),
    //     // end: new Date(2018, 3, 15),  // end is optional
    //     content: 'continent A',
    //   },{
    //
    //     start: new Date(2018, 3, 20),
    //     // end: new Date(2018, 3, 21),
    //     content: 'CLOSING',
    //   },
    // ]
    const openit = (id, {top, left}) => {
      const m = milestones.find(ms => ms.id === id)
      this.setState({anchorPosition: {top, left}, pOpen: true, m})
    }

    const closeit = () => {
      this.setState({anchorPosition: {top: 0, left: 0}, pOpen: false, m: {}})

    }

    const onClick = (e) => {
      console.dir(e)
      if (e.what !== 'item') {
        return
      }
      openit(e.item, {top: e.pageY, left: e.pageX})
    }
    const {m, pOpen, anchorPosition} = this.state

    return (

      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>
          <Timeline timelineRef={t => window.timeline = this.timeline = t} options={options} items={items} clickHandler={onClick}/>
          <Popover open={pOpen} anchorReference='anchorPosition' anchorPosition={anchorPosition} onClose={closeit}>
            <div className='milestone-wrapper'>
              <div className='milestone-title'>{m.title}</div>
              <div className='milestone-date'>{moment(m.date).format('DD MMM YYYY')}</div>
              <div className='milestone-status'>Status: {m.state} <span className={`status-icon ${m.state}`}>&nbsp;</span></div>
              <ul className='area'>
                <li>important</li>
                <li>Things</li>
                <li>go</li>
                <li>Here</li>
                <li>and</li>
                <li>are</li>
                <li>important</li>
              </ul>
            </div>
          </Popover>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
        <ul>
        <li>
        <button onClick={() => {window.timeline.zoomIn(1)}}>+</button>
        <button onClick={() => {window.timeline.zoomOut(1)}}>-</button>
        </li>
        {milestones.map((m,i) => (
          <li key={i}><button onClick={() => this.timeline.moveTo(m.date)}>{m.title}</button></li>
        ))}
        </ul>
        </div>
      </div>
    );
  }
}

export default App;
