import PropTypes from 'prop-types';
import { append, contains, without } from 'ramda';
import React, { Component } from 'react';

/**
 * Dropdown list of options
 */
export default class InsightDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = { value: props.value };
    }

    componentWillReceiveProps(newProps) {
        this.setState({ value: newProps.value });
    }

    render() {
        const {
            className,
            id,
            selectClassName,
            selectStyle,
            multi,
            options,
            setProps,
            style,
        } = this.props;
        const { value } = this.state;

        return (
            <div id={id} style={style} className={className}>
                <select
                    className={selectClassName}
                    style={selectStyle}
                    multiple={multi}
                    value={value}
                    onChange={(e) => {
                        let newValue = [];
                        for (var i = 0, l = e.target.options.length; i < l; i++) {
                            if (e.target.options[i].selected) {
                                newValue.push(e.target.options[i].value);
                            }
                        }
                        this.setState({ value: newValue });
                        if (setProps) {
                            setProps({ value: newValue });
                        }
                    }}
                >
                {options.map(option => (
                    <option
                        value={option.value}
                        disabled={Boolean(option.disabled)}
                        selected={contains(option.value, value)}
                    >
                        {option.label}
                    </option>
                ))}
                </select>
            </div>
        );
    }
}

InsightDropdown.propTypes = {
    id: PropTypes.string,

    /**
     * An array of options
     */
    options: PropTypes.arrayOf(
        PropTypes.shape({
            /**
             * The checkbox's label
             */
            label: PropTypes.string,

            /**
             * The value of the checkbox. This value
             * corresponds to the items specified in the
             * `value` property.
             */
            value: PropTypes.string,

            /**
             * If true, this checkbox is disabled and can't be clicked on.
             */
            disabled: PropTypes.bool,
        })
    ),

    /**
     * The currently selected value
     */
    value: PropTypes.arrayOf(PropTypes.string),

    /**
     * The class of the container (div)
     */
    className: PropTypes.string,

    /**
     * The style of the container (div)
     */
    style: PropTypes.object,

    /**
     * The style of the <select> element
     */
    selectStyle: PropTypes.object,

    /**
     * The class of the <select> element
     */
    selectClassName: PropTypes.string,

    /**
     * Whether it's a multi select or not
     */
    multi: PropTypes.bool,

    /**
     * Dash-assigned callback that gets fired when the value changes.
     */
    setProps: PropTypes.func,
};

InsightDropdown.defaultProps = {
    selectStyle: {},
    selectClassName: '',
    multi: false,
    options: [],
};