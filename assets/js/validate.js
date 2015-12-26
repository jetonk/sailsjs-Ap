/**
 * Created by Jeton on 5/2/2015.
 */
var Validate = {
    failed : [],
    inputs : function(formClass) {
        this.reset();
        var inputs = $('.' + formClass);
        for (var i = 0; i < inputs.length; i++) {
            if ($(inputs[i]).val() == "") {
                this.save($(inputs[i]).attr('id'));
            }
        }
    },
    save : function(id) {
        this.failed.push(id);
    },
    reset : function() {
        this.failed = [];
        $('.validationError').text('');
    },
    passed : function() {
        if (Validate.failed.length == 0) {
            return true;
        } else {
            return false;
        }
    },
    showError : function() {
        this.failed.forEach(function(id) {
            $('#' + id).after('<div class="form-group validationError">This is required..</div>');
        });
    }
};