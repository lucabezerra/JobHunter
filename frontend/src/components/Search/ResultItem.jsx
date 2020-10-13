import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import sanitizeHtml from 'sanitize-html';
import HTMLEllipsis from 'react-lines-ellipsis/lib/html'

import './style.css';


const Container = styled.div`
  margin: 5px 0;
  display: flex;
  flex-direction: row;
  align-self: center;
  border-bottom: 1px solid black;
  padding-bottom: 20px;
  margin-bottom: 20px;

  &:last-of-type {
    border: none;
  }
`;

const Logo = styled.img`
  width: 200px;
  height: 200px;
  object-fit: contain;
`;

const CustomUL = styled.ul`
  padding-inline-start: 10px;
  padding-inline-end: 20px;
  min-width: 200px;
`;

const CustomLI = styled.li`
  list-style: none;
  margin-bottom: 10px;
`;

const TextContainer = styled.div`
  margin: 0 10px;
  ${props => props.border ? (
    'border: 1px dashed black;' +
    'height: fit-content;' +
    'padding: 5px;' +
    'width: 15em;' +
    'overflow-wrap: break-word;'
  ) : ''}
`;

const EllipsisContainer = styled.div`
  cursor: pointer;
`;

const ResultItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Container>
      <CustomUL>
        <CustomLI>
          <a href={item.company_url} target="_blank">
            <Logo src={item.company_logo} />
          </a>
        </CustomLI>
        <CustomLI><b>Company:</b> {item.company}</CustomLI>
        <CustomLI><b>Title:</b> <a href={item.url} target="_blank">{item.title}</a></CustomLI>
        <CustomLI><b>Type:</b> {item.type}</CustomLI>
        <CustomLI><b>Publication Date:</b> {item.created_at}</CustomLI>
        <CustomLI><b>Location:</b> {item.location}</CustomLI>
      </CustomUL>
      {/* <TextContainer dangerouslySetInnerHTML={{__html: sanitizeHtml(item.description)}} /> */}
      {expanded ?
        <TextContainer dangerouslySetInnerHTML={{__html: sanitizeHtml(item.description)}} />
        :
        <EllipsisContainer onClick={() => setExpanded(true)}>
          <HTMLEllipsis
            unsafeHTML={sanitizeHtml(item.description)}
            maxLine='20'
            ellipsisHTML='<i class="read-more"> ... read more</i>'
            basedOn='letters'
          />
        </EllipsisContainer>
      }
      <TextContainer border dangerouslySetInnerHTML={{__html: sanitizeHtml(item.how_to_apply)}} />
    </Container>
  );
};

ResultItem.propTypes = {
  item: PropTypes.object.isRequired,
}

export default ResultItem;
