import { useRecoilState } from 'recoil';
import { Background } from '../components/background/Background';
import { userIdState } from '../states';

export function ConnectedPage() {
  const [userId, setUserId] = useRecoilState(userIdState);
  const apiUrl = import.meta.env.VITE_API_URL;
  const templateUrls = [`template_1_1`, `template_1_2`, `template_1_3`, `template_3_1`].map(
    (template) => `${apiUrl}/users/${userId}/recent/played/tracks?template=${template}`,
  );

  const copyTemplateUrlToMarkdown = async (template: string) => {
    const markdown = `[${template}](${template})`;
    await navigator.clipboard.writeText(markdown);

    // show success alert
    alert('Copied to clipboard!');
  };

  const disconnect = () => {
    setUserId(null);
  };

  return (
    <div className="background">
      <Background />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', gap: 16 }}>
          <h1>Connected</h1>
          <button type="button" onClick={disconnect}>
            Disconnect
          </button>
        </div>
        <h2>Available Templates</h2>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 60 }}>
          {templateUrls.map((templateUrl) => (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <img src={templateUrl} alt="Recent Played Tracks" />
              {/*  Copy Template Url To Clipboard */}
              <button style={{ height: '4rem' }} type="button" onClick={() => copyTemplateUrlToMarkdown(templateUrl)}>
                Copy Template Url
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
