import {initializeOrg} from 'sentry-test/initializeOrg';
import {reactHooks} from 'sentry-test/reactTestingLibrary';

import useReplayReader from 'sentry/utils/replays/hooks/useReplayReader';

jest.mock('sentry/utils/replays/hooks/useReplayData', () => ({
  __esModule: true,
  default: () => jest.fn().mockReturnValue({}),
}));

const {organization, project} = initializeOrg();

describe('useReplayReader', () => {
  beforeEach(() => {
    MockApiClient.clearMockResponses();
  });

  it('should accept a replaySlug with project and id parts', () => {
    const {result} = reactHooks.renderHook(useReplayReader, {
      initialProps: {
        orgSlug: organization.slug,
        replaySlug: `${project.slug}:123`,
      },
    });

    expect(result.current).toStrictEqual(
      expect.objectContaining({
        replayId: '123',
      })
    );
  });

  it('should accept a replaySlug with only the replay-id', () => {
    const {result} = reactHooks.renderHook(useReplayReader, {
      initialProps: {
        orgSlug: organization.slug,
        replaySlug: `123`,
      },
    });

    expect(result.current).toStrictEqual(
      expect.objectContaining({
        replayId: '123',
      })
    );
  });
});
