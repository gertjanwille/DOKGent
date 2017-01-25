import {ToggleData} from './data/';

import {toggleMenu} from './modules/util/Toggle';
import {mapVal} from './modules/util/Mathutil';

import {isArray} from 'lodash';
// import fetch from 'isomorphic-fetch';

let bar, deviceHeight;

const init = () => {
  const $progressFill = document.querySelector(`.fill-load`);
  const $footer = document.querySelector(`footer`);

  bar = document.querySelector(`.progress-bar`);
  deviceHeight = bar.clientHeight;

  ToggleData.map(el => document.querySelector(el.selector).addEventListener(`click`, e => toggleMenu(e, (isArray(el.element)) ? [document.querySelector(el.element[0]), document.querySelector(el.element[1])] : document.querySelector(el.element), el.stateI, el.stateII, el.sync, el.tway)));

  window.addEventListener(`resize`, () => deviceHeight = bar.clientHeight);

  document.addEventListener(`scroll`, () => {
    window.requestAnimationFrame(() => scrollProgressBar($progressFill, deviceHeight, $footer));
  });

  scrollProgressBar($progressFill, deviceHeight, $footer);

};

const scrollProgressBar = (progressFill, deviceHeight, footer) => {
  const max = (document.body.scrollHeight - window.innerHeight) - deviceHeight - footer.scrollHeight;
  const endScroll = (document.body.scrollHeight - window.innerHeight) - footer.scrollHeight;

  const scroll = window.scrollY;

  const header = 60;

  if (scroll >= deviceHeight + header) bar.style.top = `${scroll + header}px`;
  if (scroll >= endScroll - header) bar.style.top = `${endScroll}px`;

  const scrolVal = mapVal(scroll - deviceHeight, header, max, 0, 100);
  progressFill.style.height = `${scrolVal}%`;
};


init();
