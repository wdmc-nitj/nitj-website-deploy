import React, { useState } from 'react';
import { Box, Button, Text } from '@admin-bro/design-system';

const CopyLinkActionComponent = React.memo(({ record }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (record && record.params && record.params._id) {
      const url = `https://nitj.ac.in/diia_U/template.html?id=${record.params._id}&category=newsPage`;
      navigator.clipboard.writeText(url)
        .then(() => {
          console.log('Link copied to clipboard');
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(err => console.error('Clipboard copy failed:', err));
    } else {
      console.warn('No record data found');
    }
  };

  return (
    <Box className='flex items-center' >
      <Button mt="lg" onClick={handleCopy} className="{copied ? 'bg-green-500' : 'bg-blue-500} hover:bg-blue-700 text-white font-bold py-2  rounded-md">
        {copied ? 'Copied!' : 'Copy Link'}
      </Button>
    </Box>
  );
});

export default CopyLinkActionComponent;
