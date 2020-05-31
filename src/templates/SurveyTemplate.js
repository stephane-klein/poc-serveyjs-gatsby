import React from 'react';

import { navigate } from 'gatsby'
import { ApolloProvider } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import * as Survey from "survey-react";
import "survey-react/survey.css";
import showdown from "showdown";

import ApolloClient from '../Apollo';

const SurveyComponent = ({modelData}) => {
  const [createResult] = useMutation(
    gql`mutation createResult ($input: CreateResultInput!) {
      createResult(input: $input) {
        clientMutationId
      }
    }`
  );

  var model = new Survey.Model(modelData);
  var converter = new showdown.Converter();
  model
    .onTextMarkdown
    .add(function (survey, options) {
        //convert the mardown text to html
        var str = converter.makeHtml(options.text);
        //remove root paragraphs <p></p>
        str = str.substring(3);
        str = str.substring(0, str.length - 4);
        //set html
        options.html = str;
    });

  model.showProgressBar = 'bottom';
  return (
    <Survey.Survey
      model={model}
      onComplete={(survey, option) => {
        createResult({
          variables: {
            input: {
              result: JSON.stringify(survey.data)
            } 
          }
        });
        navigate('./completed/');
      }}
    />
  );
};

const SurveyTemplate = (data) => {
  return (
    <div>
      <ApolloProvider client={ApolloClient}>
        <SurveyComponent modelData={data.pageContext.data} />
      </ApolloProvider>
    </div>
  );
};

export default SurveyTemplate;