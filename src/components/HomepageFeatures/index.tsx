import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Easy to Use',
    Svg: require('@site/static/img/undraw-oj-lab-mountain.svg').default,
    description: (
      <>
        If you are a user of OJ Lab, you can easily find the information you.
        OJ Lab Docusaurus contains everything you will need to know.
      </>
    ),
  },
  {
    title: 'Stay Focus on News',
    Svg: require('@site/static/img/undraw-oj-lab-tree.svg').default,
    description: (
      <>
        OJ Lab Docusaurus help you keep up with the latest news in the OJ Lab.
      </>
    ),
  },
  {
    title: 'Powered by React',
    Svg: require('@site/static/img/undraw-oj-lab-react.svg').default,
    description: (
      <>
        This website layout can be extended or customized by reusing React.
        It's also mobile-friendly.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
