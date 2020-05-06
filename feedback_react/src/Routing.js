import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Reports from './Reports';
import Events from './Events';
import Question from './Feedback/Question';
import AddQuestion from './Feedback/AddQuestion';
import EditQuestion from './Feedback/EditQuestion';

const Routing = props => {
    return (
        <div>
            <Switch>
                <Route exact path='/' component={Reports} />
                <Route path='/reports' component={Reports} />
                <Route path='/events' component={Events} />
                <Route path='/questioninfo' component={Question} />
                <Route path='/addquestion' component={AddQuestion} />
                <Route path='/editquestion' component={EditQuestion} />
            </Switch>
        </div>
    )
}

export default Routing;