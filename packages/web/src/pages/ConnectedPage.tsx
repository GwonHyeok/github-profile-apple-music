import { useRecoilState } from 'recoil';
import { userIdState } from '../states';

export function ConnectedPage() {
  const [userId, setUserId] = useRecoilState(userIdState);
  const apiUrl = import.meta.env.VITE_API_URL;
  const templates = [
    `${apiUrl}/users/${userId}/recent/played/tracks`,
    `${apiUrl}/users/${userId}/recent/played/tracks?template=template_1_2`,
    `${apiUrl}/users/${userId}/recent/played/tracks?template=template_1_3`,
  ];

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
    <div>
      <div style={{ display: 'flex', gap: 16 }}>
        <h1>Connected</h1>
        <button onClick={disconnect}>Disconnect</button>
      </div>
      <h2>Available Templates</h2>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {templates.map((templateUrl) => (
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
  );
}
