import React from 'react';
import { useQuery, gql } from "@apollo/client";
import "../Style/serachreasult.css";
import IitjTree from './IitjTree';
import MinLoader from '../component/MinLoader';
import { useData } from '../context/DataContext';
const Search = () => {
  const {searchtext,searchtexts}= useData()
  console.log(searchtexts)
  const FILMS_QUERY = gql`
    query GetChildren($searchtexts: String!,$searchtext: String!) {
      
      children(rollNumber:$searchtexts) {
    rollNo
    picture
    name
  }
  parent(rollNumber:$searchtexts) {
    rollNo
    picture
    name
  }
  sibling(rollNumber:$searchtexts) {
    rollNo
    picture
    name
  }
  student(rollNumber:$searchtexts) {
    picture
    rollNo
    name
  }
  studentSearch(searchQuery: $searchtext) {
    name
    rollNo
  }
  
    }
  `;

  const { loading, error, data } = useQuery(FILMS_QUERY, {
    variables: {searchtexts,searchtext},
  });
  // console.log('data',data.studentSearch)

  if (loading) return <MinLoader sometext={'Loading....'} />;
  if (error) return <MinLoader sometext={'connection error....'}/>;
  return (
    <div className='topmargin'>
      <div className="text">
        <div className='treediv'>
      <IitjTree data={data}/>
        </div>

      </div>
     
    </div>
  )
}

export default Search
