/**
 * General types testing
 */
'use strict';
describe('Any custom type', function(){
	var testContainer = window.formBuilderTesting.testContainer;

	var types = $.formBuilder.inputField.types;

	describe('may be a simple regex type', function(){

		it('that has a regex validation pattern', function(){
			types.testType = $.formBuilder.inputField.createRegexType(/^[0-9]$/);

			var input = $('<input type="text" data-type="testType"/>').appendTo(testContainer).inputFilter().inputField();
			var filter = input.data('formBuilderInputFilter'); 
			var ifw = input.data('formBuilderInputField');
			var typeInstance = ifw.getType();
			var Obj = {
				message: 'invalid'
			};

			ifw.set('abcde');

			var result = typeInstance.validate(ifw); 

			expect(result).toEqual(Obj);

			types.testType = undefined;
			testContainer.empty(); 
		});

		it('that has a regex filter pattern', function(){
			types.testType = $.formBuilder.inputField.createRegexType(/^[0-9]$/, /[0-9]/);

			var input = $('<input type="text" data-type="testType"/>').inputFilter().inputField();
			var filter = input.data('formBuilderInputFilter'); 
			var ifw = input.data('formBuilderInputField');
			var typeInstance = ifw.getType();

			expect(filter.options.pattern).toEqual(/[0-9]/);

			types.testType = undefined;
		});

		it('that may have flags such as toUpper', function(){
			types.testType = $.formBuilder.inputField.createRegexType(/^[0-9]$/, /[0-9]/, {
				toUpper: true 
			});

			var input = $('<input type="text" data-type="testType"/>').inputFilter().inputField();
			var filter = input.data('formBuilderInputFilter'); 
			var ifw = input.data('formBuilderInputField');
			var typeInstance = ifw.getType();

			expect(filter.options.toUpper).toBe(true);

			types.testType = undefined;
		});

		it('that may use a cannedFormatter (trim)', function(){
			types.testType = $.formBuilder.inputField.createRegexType(/^[0-9\s]*$/, /[0-9\s]/, {
				 cannedFormatter: 'trim'
			});

			var input = $('<input type="text" data-type="testType"/>').inputField();
			var filter = input.data('formBuilderInputFilter'); 
			var ifw = input.data('formBuilderInputField');
			var typeInstance = ifw.getType();

			expect(typeInstance.format('  32424  ')).toBe('32424');

			types.testType = undefined;
		});

		it('that may have a max', function(){
			types.testType = $.formBuilder.inputField.createRegexType(/^[0-9\s]*$/, /[0-9\s]/, {}, 10);

			var input = $('<input type="text" data-type="testType"/>').inputField();
			var filter = input.data('formBuilderInputFilter'); 
			var ifw = input.data('formBuilderInputField');
			var typeInstance = ifw.getType();

			expect(filter.options.max).toBe(10);

			types.testType = undefined;
		});

		it('and its max value will be overwritten if there is a data-max value', function(){
			types.testType = $.formBuilder.inputField.createRegexType(/^[0-9\s]*$/, /[0-9\s]/, {}, 10);

			var input = $('<input type="text" data-type="testType" data-max="50"/>').inputField();
			var filter = input.data('formBuilderInputFilter'); 
			var ifw = input.data('formBuilderInputField');
			var typeInstance = ifw.getType();

			expect(filter.options.max).toBe(50);

			types.testType = undefined;
		});
	});
});