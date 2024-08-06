import { render,h } from 'preact';

import preactLogo from './assets/preact.svg';
import {  useRef, useEffect } from 'preact/hooks'
import './style.css';
import '@esri/calcite-components/dist/calcite/calcite.css';
import '@esri/calcite-components';
import { defineCustomElements } from '@esri/calcite-components/dist/loader';
defineCustomElements(window,{
  resourcesUrl: "https://js.arcgis.com/calcite-components/2.10.1/assets"
});

import Bookmarks from '@arcgis/core/widgets/Bookmarks';
import Expand from '@arcgis/core/widgets/Expand';
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";



export function App() {

  const mapDiv = useRef(null);

  useEffect(() => {
    if (mapDiv.current) {

  const webmap = new WebMap({
    portalItem: {
      id: "aa1d3f80270146208328cf66d022e09c"
    }
  });
  
  const view = new MapView({
    container:mapDiv.current,
    map: webmap
  });
  
  const bookmarks = new Bookmarks({
    view
  });
  
  const bkExpand = new Expand({
    view,
    content: bookmarks,
    expanded: true
  });
  
  // Add the widget to the top-right corner of the view
  view.ui.add(bkExpand, "top-right");
  
  // bonus - how many bookmarks in the webmap?
  view.when(() => {
    if (webmap.bookmarks && webmap.bookmarks.length) {
      console.log("Bookmarks: ", webmap.bookmarks.length);
    } else {
      console.log("No bookmarks in this webmap.");
    }


   

  });

 }
  }, [mapDiv]);
	return (
    <>
    
  

<calcite-navigation slot="header" class="app-nav">
    <calcite-navigation-logo id="navlogo" thumbnail={preactLogo}  alt="Application logo" slot="logo" headingLevel="3"
        heading="Application"></calcite-navigation-logo >
     
    <calcite-action-pad layout="horizontal" expand-disabled slot="content-end">
     
        <calcite-action id="toggle-mode" text="Change Mode" text-enabled icon="brightness"></calcite-action>
        <calcite-action id="open-modal" text="About this Application" icon="information"></calcite-action>
    </calcite-action-pad>           
   
    <calcite-tooltip placement="bottom" reference-element="toggle-mode" slot="content-end">Change Mode</calcite-tooltip>
    <calcite-tooltip placement="bottom" reference-element="open-modal" close-on-click slot="content-end">Map Disclaimer</calcite-tooltip>            
</calcite-navigation>
<div className="mapDiv" ref={mapDiv}></div>


<calcite-modal aria-labelledby="modal-title" id="example-modal" open>
    <div slot="header" id="modal-title">
        Add a group
    </div>
    <div slot="content">
        <calcite-label>
            Group name
            <calcite-input value="City of Acme Surveying Crews" placeholder="Enter a descriptive title"></calcite-input>
        </calcite-label>
        
     </div>
</calcite-modal>
<calcite-button id="example-button">Open modal</calcite-button>


    </>
	  
	);
 

}

function Resource(props) {
	return (
		<a href={props.href} target="_blank" class="resource">
			<h2>{props.title}</h2>
			<p>{props.description}</p>
		</a>
	);
}

render(<App />, document.getElementById('app'));
