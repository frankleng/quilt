import React from 'react';
import {mount} from '@shopify/react-testing';

import {useProgressState} from '../progress-state';

describe('useProgressState', () => {
  function MockComponent({method = (() => new Promise(null)) {
    const [value, methodHandler] = useProgressState(method);

    const inProgress = value ? 'true' : 'false';

    return (
      <>
        <p>Progress: {inProgress}</p>
        <button type="button" id="method" onClick={methodHandler} />
      </>
    );
  }

  it('sets progress to false', () => {
    const wrapper = mount(<MockComponent />);
    expect(wrapper).toContainReactText('Progress: false');
  });

  it('sets progress to true when method is called', () => {
    const wrapper = mount(<MockComponent />);
    expect(wrapper).toContainReactText('Value: false');

    wrapper.find('button', {id: 'method'}).trigger('onClick');
    expect(wrapper).toContainReactText('Progress: true');

    wrapper.find('button', {id: 'toggle'}).trigger('onClick');
    expect(wrapper).toContainReactText('Progress: false');
  });
});
