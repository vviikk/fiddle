import { shallow } from 'enzyme';
import * as React from 'react';

import { WelcomeTour } from '../../../src/renderer/components/tour-welcome';
import { ipcRendererManager } from '../../../src/renderer/ipc';

describe('Header component', () => {
  let store: any;

  beforeEach(() => {
    store = {
      isTourShowing: true,
      disableTour: jest.fn()
    };

    ipcRendererManager.removeAllListeners();
  });

  it('renders', () => {
    const wrapper = shallow(<WelcomeTour appState={store} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the tour once started', () => {
    const wrapper = shallow(<WelcomeTour appState={store} />);
    const instance: WelcomeTour = wrapper.instance() as any;

    instance.startTour();

    expect(wrapper.state('isTourStarted')).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('stops the tour on stopTour()', () => {
    const wrapper = shallow(<WelcomeTour appState={store} />);
    const instance: WelcomeTour = wrapper.instance() as any;

    instance.stopTour();

    expect(wrapper.state('isTourStarted')).toBe(false);
    expect(store.disableTour).toHaveBeenCalled();
  });
});
