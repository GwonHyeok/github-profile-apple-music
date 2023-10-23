import { useRecoilState } from 'recoil';
import { Button, Container, Flex, Grid, GridItem, Heading, Spacer, Stack, Text, useClipboard } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Background } from '../components/background/Background';
import { userIdState } from '../states';

export function ConnectedPage() {
  const [userId, setUserId] = useRecoilState(userIdState);
  const apiUrl = import.meta.env.VITE_API_URL;
  const templateUrls = [`template_1_1`, `template_1_2`, `template_1_3`, `template_3_1`].map(
    (template) => `${apiUrl}/users/${userId}/recent/played/tracks?template=${template}`,
  );

  // Copied Value
  const { onCopy, value, setValue, hasCopied } = useClipboard('');
  const [clipboardTemplateUrl, setClipboardTemplateUrl] = useState('');

  const copyTemplateUrlToMarkdown = async (template: string) => {
    setValue(`[${template}](${template})`);
    setClipboardTemplateUrl(template);
  };

  const disconnect = () => {
    setUserId(null);
  };

  useEffect(() => {
    if (value) onCopy();
  }, [value]);

  return (
    <div className="background">
      <Background />
      <Container>
        <Stack spacing={8}>
          <Flex direction="row">
            <Heading color="white">Templates</Heading>
            <Spacer />
            <Button onClick={disconnect} variant="link" color="white">
              Disconnect
            </Button>
          </Flex>

          <Grid templateColumns="repeat(2, 1fr)" gap={8} gridRowGap={8}>
            {templateUrls.map((templateUrl) => (
              <GridItem rowSpan={1} colSpan={1} key={templateUrl}>
                <Stack direction="column" justifyItems="center">
                  <img style={{ width: '100%' }} src={templateUrl} alt="Recent Played Tracks" />
                  {/*  Copy Template Url To Clipboard */}
                  <Button colorScheme="whiteAlpha" onClick={() => copyTemplateUrlToMarkdown(templateUrl)}>
                    <Text>{hasCopied && clipboardTemplateUrl === templateUrl ? 'Copied!' : 'Copy Markdown'}</Text>
                  </Button>
                </Stack>
              </GridItem>
            ))}
          </Grid>
        </Stack>
      </Container>
    </div>
  );
}
