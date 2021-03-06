import React from "react";
import resources from "../ml_resources.json";
import { useState } from 'react';
import MouseTooltip from 'react-sticky-mouse-tooltip';
import { ReactTinyLink } from "react-tiny-link";

const Display = () => {
  const [search, setSearch] = useState("");
  const [url,setUrl] = useState("");
  var hover_preview = "";
  if(url!==""){
  console.log(url)
  hover_preview = <ReactTinyLink
                  cardSize="small"
                  showGraphic={true}
                  maxLine={2}
                  minLine={1}
                  url={url}
                  onError={(e)=>console.log(e)}
                  />
  }
  return (
    <div>
      <h1>
        <span>ML Resources</span>
      </h1>
      <div className="search">
      <input
            type="text"
            placeholder="search"
            value={search}
            onChange={(event,value) => setSearch(event.target.value)}
         />
      </div>
      <dl className="json">

        {resources.filter(
          (resource => resource.link.toLowerCase().includes(search.toLowerCase())||resource.description.toLowerCase().includes(search.toLowerCase())||resource.title.toLowerCase().includes(search.toLowerCase()))
          ).map((resource, index) => {
          return (
            <div className="bxstyle" key={resource.id} onMouseLeave={()=>setUrl("")} onMouseEnter={()=>setUrl(resource.link)} onClick={() => window.open(resource.link, "_blank")}>
              <dt>
                <span className="title" role="img" aria-label={resource.title}>
                  {resource.title}
                </span>
              </dt>
              <hr />
              <dd>
                <span className="describe">{resource.description}</span>
              </dd>
            </div>
          );
        })}
      </dl>
      <MouseTooltip
          visible={url!==""}
          offsetX={15}
          offsetY={10}
        >
          {hover_preview}
          
        </MouseTooltip>
    </div>
  );
};

export default Display;
