import React from 'react';
import { render } from 'react-dom';

import Person from './person'
import PersonForm from './person_form'
import personStore from './person_store'

class Main extends React.Component {

    constructor() {

        super();
/*
        this.state = {
            people: [
                { name: "Rick Lee", age: 19 },
                { name: "Mary Cheung", age: 44 },
                { name: "Ann Chu", age: 33 }
            ]
        }*/

        this.state = {
            people: personStore.getPeople()
        } 

        this.refresh = this.refresh.bind(this)
    }

    componentWillMount() {

        personStore.on("change", this.refresh)
    }

    componentWillUnMount() {

        personStore.removeListener("change", this.refresh)
    }

    refresh() {

        this.setState({people: personStore.getPeople()})
    }

    onSubmit(name, age) {
        console.log(name);
        console.log(age);

        this.setState({people:this.state.people.concat({name:name, age:age})})
    }

    render() {

        const peopleList = this.state.people.map( x => {

            return <Person key={x.name} {...x} />
        })

        return (
            <div>
                <h2>This is a React component</h2>
                {peopleList}
                <PersonForm onSubmit={this.onSubmit.bind(this)} />

            </div>
        )
    }
}

render(<Main />, document.getElementById('app'));