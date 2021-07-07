import { act, renderHook } from '@testing-library/react-hooks';

import { useTagDropboxState } from '../../../../src/react-common-components/ui/form/molecules/oc-tags/hooks';


describe('OcTags (hooks)', () => {
	const createTagMock = jest.fn();

	it('should set inputValue and skip when "input-blur" action was took', () => {
		const { result } = renderHook(() => useTagDropboxState({ createTag: createTagMock }));

		act(() => {
			result.current.onInputChange('custom-option', { action: 'input-change' });
		});

		expect(result.current.inputValue).toBe('custom-option');

		// test this - (action === 'menu-close' || action === 'input-blur')
		act(() => {
			result.current.onInputChange('', { action: 'input-blur' });
		});
	});

	it('should reset inputValue', () => {
		const { result } = renderHook(() => useTagDropboxState({ createTag: createTagMock }));

		act(() => {
			result.current.onInputChange('value', { action: 'input-change' });
		});

		act(() => {
			result.current.resetInputValue();
		});

		expect(result.current.inputValue).toBe('');
	});

	it('should create tag on pressing Enter/Tag', () => {
		const onBlurMock = jest.fn();

		const { result } = renderHook(() => useTagDropboxState({ createTag: createTagMock }));

		act(() => {
			result.current.onInputChange('new-tag', { action: 'input-change' });
		});

		act(() => {
			result.current.onKeyDown({
				key: 'Enter',
				preventDefault: jest.fn(),
				target: {
					blur: onBlurMock,
				},
			});
		});

		expect(createTagMock).toHaveBeenCalledWith('new-tag');

		// inputValue is empty here, jest test - if (!inputValue) return;
		act(() => {
			result.current.onKeyDown({
				key: 'Tab',
				preventDefault: jest.fn(),
				target: {
					blur: onBlurMock,
				},
			});
		});
	});

});
