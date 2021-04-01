import './App.css';
import Amplify, {API, graphqlOperation} from 'aws-amplify';
import awsConfig from './aws-exports';
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import {listListItems, listLists} from './graphql/queries';
import { useEffect, useState } from 'react';
// import 'semantic-ui-css/semantic.min.css';

Amplify.configure(awsConfig);

function App() {
  const [ list , setList] = useState([]);
  async function fetchList(){
    const {data} = await API.graphql(graphqlOperation(listLists));
    setList(data.listLists.items);
    console.log(data);
  }
  useEffect(()=>{
    fetchList();
  },[])
  return (
    <AmplifyAuthenticator>
      <div className="App">
        <h1>Welcome to Amplify</h1>
        <ul>
          {list.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
        <AmplifySignOut/>
      </div>
    </AmplifyAuthenticator>
  );
}

export default App;
