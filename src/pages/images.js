"use client"
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { useState, useEffect } from 'react';

export default function Images() {
    
  const [ImageList, setImageList] = useState([]);
  const getImageContent = images => {
    let mainContent=[]
    let content = []
    let count = 0;
    for (let [index, item] of images.entries()) {
      if(count == 5) {
        count = 0;
        mainContent.push(
          <div className={`${styles.container}`}>
            { content }
          </div>
        )
        content = [];
      }
      content.push(
      <div key={index} className={`${styles.box}`}>
        <Image
          src={item.data.url}
          alt={item.data.title}
          className={styles.vercelLogo}
          width={800}
          height={24}
          loading="lazy"
        />
        <span>{item.data.title}</span>
      </div>
      );
      count++;
    }
    return mainContent;
  };
  

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://www.reddit.com/r/images/new.json?limit=30');
      const {data} = await response.json();
      setImageList(data.children);
    };

    fetchData();
  }, []);

  return getImageContent(ImageList);
}