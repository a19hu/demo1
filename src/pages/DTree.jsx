import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tree from 'react-d3-tree';
import '../Style/home.css'
import Homeprofile from '../component/Homeprofile';
import MinLoader from '../component/MinLoader';

 

const DTree = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [roll,setroll]=useState()
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://172.31.49.27:8000/students/nodes/');
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
// console.log(data)
 
  if (isLoading) return <MinLoader sometext={'Loading....'} />;
  if (error) return <MinLoader sometext={'connection error....'}/>;
  
  const new_data=[]
  const all_parent={
    name:'All',
    children:[]
  }
  // const dataobject = JSON.parse(data);
  // all_parent.children.push(data)
  data.forEach(item => {
    all_parent.children.push(item);
});
  new_data.push(all_parent)
   const datas=[
    {
      name:'all',
      children:[]
    }
   ]
  // const handleNodeClick = (nodeData, event) => {

  // };
 
  // const handleLinkClick = (linkData, event) => {
  //   console.log(linkData)
  // };
  const generateDiagonalPath = (source, target) => {
    return `M${source.y},${source.x}C${source.y},${(source.x + target.x) / 2} ${target.y},${(source.x + target.x) / 2} ${target.y},${target.x}`;
  };
  const renderCustomLink = ({ source, target }) => (
    <path
      d={generateDiagonalPath(source, target)}
      fill="none"
      stroke="#ccc"
      strokeWidth={3}
    />
  );
  
  const renderCustom = ({ nodeDatum, toggleNode , links }) => {

    // const isRoot = !nodeDatum.parentId;
    // const isLeaf = !nodeDatum.children;
  
    // Define colors for root, branch, and leaf nodes
    // const rootColor = 'white';
    // const branchColor = '#8b2d2d';
    // const leafColor = '# 8b2d2d';
  
    // // Set color based on node type
    // let nodeColor;
    // if (isRoot) {
    //   nodeColor = rootColor;
    // } else if (isLeaf) {
    //   nodeColor = leafColor;
    // } else {
    //   nodeColor = branchColor;
    // }
    const str= nodeDatum.name
  const name= str.slice(0,19) + '' 
    return(
    <g 
    onMouseOut={() => handleNodeMouseOut(nodeDatum)}
      onMouseOver={() => handleNodeMouseOver(nodeDatum)}
      // transform={`translate(100, 400)`}

      >

      <circle r={10} className='circle' />
      <text
      //  fill="white"
      //  fontSize={15}
      //  fontWeight="bold"
       textAnchor="middle"
       dy="29 em"
       dx='0 em'
       className='text_'
      >{name} </text>
      {/* {pathElements} */}
    </g>

    )
  }
  const getLinkColor = (link) => {
    if (link.source.name.includes('root')) {
      return 'red';
    }
    return 'blue';
  };
  
  const getLinkProps = (link) => ({
    stroke: getLinkColor(link),
    strokeWidth: 2, // Optional: Adjust the width of the connecting lines
  });
  
  const handleNodeMouseOver = (nodeDatum, event) => {
    if(nodeDatum.name !=='all'){
      setroll(nodeDatum)
      setShowModal(true)

    }
  };
  const handleNodeMouseOut = (nodeData, event) => {
    if(nodeData.name !=='all'){
      setShowModal(false)
    }
  };
  const dimensions = {
    width: 800,
    height: 600
  };
  return (
    <>
    {showModal && (
          <Homeprofile  data={roll} />
                            )}
    <Tree 
    data={new_data} 
    // data={datas}
    scaleExtent={{
      min: 1, 
      max: 1
    }}
    zoom={1}
    zoomable={false}
    linkClassName={"custom-link"}
    depthFactor={200}
    linkProps={getLinkProps}
    // initialDepth={2}
    // pathFunc="straight"
  nodeSize= {{ x: 100, y: 20 }}
  rootNodeClassName="node__root"
      branchNodeClassName="node__branch"
      leafNodeClassName="node__leaf"
      translate={{ x: 100, y: 400 }}
      // draggable={false}
      dimensions={dimensions}
  // orientation={"vertical"}
  pathClassFunc={() => 'custom-link'}
      renderCustomNodeElement={renderCustom}
      transitionDuration={500}
      shouldCollapseNeighborNodes={true}
      separation={{ siblings: 3.3, nonSiblings: 2 }}
      renderCustomLinkElement={renderCustomLink}
  
    />
    </>
  )
}

export default DTree
