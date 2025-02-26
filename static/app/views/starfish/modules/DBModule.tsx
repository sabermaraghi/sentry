import * as Layout from 'sentry/components/layouts/thirds';
import SentryDocumentTitle from 'sentry/components/sentryDocumentTitle';
import {
  PageErrorAlert,
  PageErrorProvider,
} from 'sentry/utils/performance/contexts/pageError';
import useOrganization from 'sentry/utils/useOrganization';
import {StarfishPageFiltersContainer} from 'sentry/views/starfish/components/starfishPageFiltersContainer';
import {ModuleName} from 'sentry/views/starfish/types';
import {ROUTE_NAMES} from 'sentry/views/starfish/utils/routeNames';
import SpansView from 'sentry/views/starfish/views/spans/spansView';

export default function DBModule() {
  const organization = useOrganization();

  return (
    <SentryDocumentTitle title={ROUTE_NAMES.database} orgSlug={organization.slug}>
      <Layout.Page>
        <PageErrorProvider>
          <Layout.Header>
            <Layout.HeaderContent>
              <Layout.Title>{ROUTE_NAMES.database}</Layout.Title>
            </Layout.HeaderContent>
          </Layout.Header>

          <Layout.Body>
            <Layout.Main fullWidth>
              <PageErrorAlert />
              <StarfishPageFiltersContainer>
                <SpansView moduleName={ModuleName.DB} />
              </StarfishPageFiltersContainer>
            </Layout.Main>
          </Layout.Body>
        </PageErrorProvider>
      </Layout.Page>
    </SentryDocumentTitle>
  );
}
