import Form from 'sentry/components/forms/form';
import {t} from 'sentry/locale';
import {OrganizationSummary} from 'sentry/types';
import withOrganizations from 'sentry/utils/withOrganizations';
import {
  NotificationSettingsByProviderObject,
  NotificationSettingsObject,
} from 'sentry/views/settings/account/notifications/constants';
import {StyledJsonForm} from 'sentry/views/settings/account/notifications/notificationSettingsByProjects';
import {
  getParentData,
  getParentField,
} from 'sentry/views/settings/account/notifications/utils';

type Props = {
  notificationSettings: NotificationSettingsObject;
  notificationType: string;
  onChange: (
    changedData: NotificationSettingsByProviderObject,
    parentId: string
  ) => NotificationSettingsObject;
  onSubmitSuccess: () => void;
  organizations: OrganizationSummary[];
};

function NotificationSettingsByOrganization({
  notificationType,
  notificationSettings,
  onChange,
  onSubmitSuccess,
  organizations,
}: Props) {
  return (
    <Form
      saveOnBlur
      apiMethod="PUT"
      apiEndpoint="/users/me/notification-settings/"
      initialData={getParentData(notificationType, notificationSettings, organizations)}
      onSubmitSuccess={onSubmitSuccess}
    >
      <StyledJsonForm
        title={t('Organizations')}
        fields={organizations.map(organization => {
          return getParentField(
            notificationType,
            notificationSettings,
            organization,
            onChange
          );
        })}
      />
    </Form>
  );
}

export default withOrganizations(NotificationSettingsByOrganization);
