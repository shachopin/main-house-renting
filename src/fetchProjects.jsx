import { useState, useEffect } from 'react';
import { createClient } from 'contentful';

const client = createClient({
  // space: '3e7vobor0uwr',
  // environment: 'master',
  // accessToken: import.meta.env.VITE_API_KEY,
  //below working 
  // space: "qz00uzgg3leh",
  // environment: "master",
  // accessToken: "9F-ayYfAgGWKUCgKbyTgjgS2CiBLM141-ScE_5ewlv0"
  // my own below
  space: 'vvnirsdlkyhy',
  environment: 'master', // defaults to 'master' if not set
  accessToken: import.meta.env.VITE_API_KEY
});

export const useFetchProjects = () => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);

  const getData = async () => {
    try {
      const response = await client.getEntries({ content_type: 'projects' });
      const projects = response.items.map((item) => {
        const { title, url, image } = item.fields;
        const id = item.sys.id;
        const img = image?.fields?.file?.url;
        return { title, url, id, img };
      });
      setProjects(projects);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return { loading, projects };
};
