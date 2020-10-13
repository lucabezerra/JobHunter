import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import querystring from 'query-string';

import Button from '../Button';
import ResultItem from './ResultItem';

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Logo = styled.img`
  height: 120px;
  width: 150px;
  align-self: center;
  object-fit: contain;
`;

const Title = styled.h1`
  align-self: center;
`;

const SubTitle = styled.h4`
  align-self: center;
  margin-block-start: 0;
  font-style: italic;
  color: gray;
`;

const SearchContainer = styled.div`
  margin-top: 15px;
  align-self: center;
  display: flex;
  justify-content: space-between;
  width: 50%;
  line-height: 3em;
  font-size: 18px;
`;

const ResultsSummary = styled.div`
  margin: 20px 0;
  text-align: center;
  ${props => props.color && 'background-color: ' + props.color + ';'}
  line-height: 2em;
  border-radius: 10px;
`;

const ResultsList = styled.div`
  display: flex;
  flex-direction: column;
`;

const CustomSelect = styled.select`
  font-size: 18px;
`;


const Search = () => {
  const [locationsList, setLocationsList] = useState([]);
  const [descriptionsList, setDescriptionsList] = useState([]);
  const [results, setResults] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [nextPage, setNextPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const locationSelect = useRef(null);
  const descriptionSelect = useRef(null);
  let resultString = null;
  const resultsPerPage = 49;  // actually 50

  useEffect(() => {
    fetch('http://localhost:8000/jobs/')
      .then(response => {
        response.json().then(responseData => {
          setLocationsList(responseData.locations);
          setDescriptionsList(responseData.descriptions);
          setLoading(false);
        });
      }).catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const onChange = () => {
    const location = locationSelect.current.value;
    const description = descriptionSelect.current.value;
    const qs = querystring.stringify({ location, description, page: nextPage });

    setSearchHistory(searchHistory + [location, description]);
    setLoading(true);
    setResults([]);
    setError(null);
    fetch(`http://localhost:8000/jobs/search?${qs}`)
      .then(response => {
        response.json().then(responseData => {
          setResults(responseData.results);
          if (responseData.results.length > resultsPerPage) {
            setNextPage(Number.parseInt(responseData.page) + 1);
          } else {
            setNextPage(1);
          }
          setLoading(false);
        });
      }).catch(err => {
        setError(err);
        setLoading(false);
      });
  }

  if (loading) {
    resultString = <ResultsSummary color="aquamarine">Searching...</ResultsSummary>;
  } else if (error) {
    console.log(error);
    resultString = <ResultsSummary color="indianred">An error happened, please try again.</ResultsSummary>;
  } else if (searchHistory.length > 0 && results.length === 0) {
    resultString = <ResultsSummary color="lightgoldenrodyellow">No results found.</ResultsSummary>;
  }

  return (
    <Container>
      <Header>
        <Logo src={ require("../../img/logo.jpg") } />
        <Title>JobHunter</Title>
        <SubTitle>Your next job is only a click away.</SubTitle>
        <SearchContainer>
          <div>
            <b>Location:</b>{' '}
            <CustomSelect ref={locationSelect} onChange={onChange}>
              <option disabled selected value=""></option>
              {locationsList.map(loc => <option key={loc}>{loc}</option>)}
            </CustomSelect>
          </div>
          <div>
            <b>Description:</b>{' '}
            <CustomSelect ref={descriptionSelect} onChange={onChange}>
              <option disabled selected value=""></option>
              {descriptionsList.map(desc => <option key={desc}>{desc}</option>)}
            </CustomSelect>
          </div>
        </SearchContainer>
      </Header>
      {resultString}
      <ResultsList>
        {results.map((item, i) => (
          <React.Fragment key={item.id}>
            <ResultItem item={item} />
            {i !== results.length - 1 ? <br /> : null}
          </React.Fragment>
        ))}
      </ResultsList>
      {results.length > resultsPerPage && <Button text="Next Page" onClick={onChange} />}
    </Container>
  );
}

export default Search;
