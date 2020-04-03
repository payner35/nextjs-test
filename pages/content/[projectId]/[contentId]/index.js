import { useRouter } from 'next/router';
import Layout from '../../../../components/layouts/layout';
import { withAuth, withLoginRequired } from "use-auth0-hooks";
import { withApollo } from '../../../../util/withApollo';

const ContentItem = ({auth, loading}) => {
  const router = useRouter()
  const { user } = auth;
  const { contentId, projectId } = router.query

  return (
    <Layout user={user} loading={loading}>
        <p>sfdfdf</p>
    </Layout>
  )
}




const auth = withLoginRequired(withAuth(ContentItem));
export default withApollo(auth, {
  // Disable apollo ssr fetching in favour of automatic static optimization
  ssr: false
});