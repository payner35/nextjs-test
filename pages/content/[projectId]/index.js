import React, { useEffect } from "react";
import Box from "@material-ui/core/Box";
import cloudinary from "cloudinary-core";
import ContentItem from "../../../components/contents/allGlobalObjects";
import { withAuth, withLoginRequired } from "use-auth0-hooks";
import Loading from "../../../components/loading";
import { useRouter } from 'next/router'
import Container from '@material-ui/core/Container';
import { withApollo } from '../../../util/withApollo';
import Layout from '../../../components/layouts/layout';

import { useQuery } from '@apollo/react-hooks';
import { GET_GLOBAL_OBJECTS } from '../../../graphql/getGlobalObjects'; 


const Content = ({ auth }) => {
  const { user } = auth;
  const router = useRouter();
  const { projectId } = router.query;

  const { loading, error, data } = useQuery(GET_GLOBAL_OBJECTS, {
        variables: { projectId: projectId },
        //ssr: false //no need to load this on server side
  });
  if (loading) return <Loading />;

  console.log(data);
  return (
     <Layout user={user} loading={loading}>
      <Container>
        <ContentItem globalObjects={data.project.globalObjects} projectId={projectId} />
      </Container>
    </Layout>
  );
};


const auth = withLoginRequired(withAuth(Content));
export default withApollo(auth, {
  // Disable apollo ssr fetching in favour of automatic static optimization
  ssr: false
})

//https://github.com/zeit/next.js/issues/9503#issuecomment-558390588