import React, { useState, useEffect } from "react";
import toc from 'remark-toc';
// import Markdown from './mark/with-html';
// import CodeBlock from './mark/code-block';
import Markdown from 'react-markdown';

import { Card } from "react-bootstrap";

const AboutPage = () =>{
	const [markdown, setMarkdown] = useState('');
  const [url] = useState("https://raw.githubusercontent.com/ristep/php-json-api-test-app/master/README.md");

  useEffect(() => {
      fetch(url)
        .then(function (response) {
          // console.log(url + " -> " + response.ok);
          if(response.ok){
            return response.text();
          }
          throw new Error('Error message.');
        })
        .then(function (data) {
          //console.log("data: ", data);
          setMarkdown( data );
        })
        .catch(function (err) {
          // console.log("failed to load ", url, err.message);
      });
  }, [url])

	return(
		<div>
        <Card className="markdown-body mainMargin">
          <Markdown
            className="result"
            source={markdown}
            skipHtml={false}
            escapeHtml={false}
            // renderers={{code: CodeBlock}}
            plugins={[toc]}
          />
        </Card>
		</div> 
  	)
}

export default AboutPage;