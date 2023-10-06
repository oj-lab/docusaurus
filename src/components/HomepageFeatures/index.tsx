import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import Translate from '@docusaurus/Translate';

type FeatureItem = {
  title: JSX.Element;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: <Translate>Easy to Use</Translate>,
    Svg: require('@site/static/img/undraw-oj-lab-mountain.svg').default,
    description: (
      <Translate>
        If you are a user of OJ Lab, you can easily find the information you.
        OJ Lab Docusaurus contains everything you will need to know.
      </Translate>
    ),
  },
  {
    title: <Translate>Stay Focus on News</Translate>,
    Svg: require('@site/static/img/undraw-oj-lab-tree.svg').default,
    description: (
      <Translate>
        OJ Lab Docusaurus help you keep up with the latest news in the OJ Lab.
      </Translate>
    ),
  },
  {
    title: <Translate>Powered by React</Translate>,
    Svg: require('@site/static/img/undraw-oj-lab-react.svg').default,
    description: (
      <Translate>
        This website layout can be extended or customized by reusing React.
        It's also mobile-friendly.
      </Translate>
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
