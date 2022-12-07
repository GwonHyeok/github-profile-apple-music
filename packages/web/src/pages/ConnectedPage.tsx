import { useRecoilValue } from 'recoil';
import { userIdState } from '../states';

export function ConnectedPage() {
  const userId = useRecoilValue(userIdState);
  const apiUrl = import.meta.env.VITE_API_URL;
  const templates = [`${apiUrl}/users/${userId}/recent/played/tracks`];

  const copyTemplateUrlToMarkdown = async (template: string) => {
    const markdown = `[${template}](${template})`;
    await navigator.clipboard.writeText(markdown);

    // show success alert
    alert('Copied to clipboard!');
  };

  return (
    <div>
      <h1>Connected</h1>

      <h2>Available Templates</h2>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {templates.map((templateUrl) => (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <img src={`${apiUrl}/users/${userId}/recent/played/tracks`} alt="Recent Played Tracks" />
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
