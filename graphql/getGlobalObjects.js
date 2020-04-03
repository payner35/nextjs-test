import gql from 'graphql-tag';

export const GET_GLOBAL_OBJECTS =  gql`
    query GetGlobalObjects($projectId: ID!) {
      project(id: $projectId){
        __typename
        id
        globalObjects {
          __typename
          id
          signOff
          mainImage
          template {
            __typename
            id
            title
          }
          globalObjectLangs {
            __typename
            id
            title
            shortDescription
            slug
          }
        }
      }
    }
`;




