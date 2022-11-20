import React from 'react'
import clsx from 'clsx'
import styles from './styles.module.css'

const FeatureList = [
  {
    title: '易学易会',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: <>用最易懂的方式生动讲解技术知识点，让学习变得简单有趣起来。</>,
  },
  {
    title: '抓住重点',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        在基础知识中挖掘 <code>重点</code> ，为后续进阶提升打好坚实的基础。
      </>
    ),
  },
  {
    title: '经验总结',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: <>所有知识提炼都来自新手小白学习过程中的经验总结，好的学习方法和知识沉淀毫无保留。</>,
  },
]

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className='text--center'>
        <Svg className={styles.featureSvg} role='img' />
      </div>
      <div className='text--center padding-horiz--md'>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className='container'>
        <div className='row'>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  )
}
