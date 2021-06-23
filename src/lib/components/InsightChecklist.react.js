import PropTypes from 'prop-types';
import { append, contains, without } from 'ramda';
import React, { Component } from 'react';

/**
 * Checklist is a component that encapsulates several checkboxes.
 * The values and labels of the checklist is specified in the `options`
 * property and the checked items are specified with the `value` property.
 * Each checkbox is rendered as an input with a surrounding label.
 */
export default class InsightChecklist extends Component {
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
            ulClassName,
            ulStyle,
            liClassName,
            liStyle,
            inputClassName,
            inputStyle,
            labelClassName,
            labelStyle,
            options,
            setProps,
            style,
        } = this.props;
        const { value } = this.state;

        // <fieldset class="js-foldable-target js-foldable-target-1 js-foldable-foldTarget" style="max-height: 217px;">
        //   <ul class="results-page__menu__checkbox">
        //       <li>
        //         <input id="regionAndCountry-england-east" type="checkbox" name="regionAndCountry" value="england-east">
        //         <label for="regionAndCountry-england-east">
        //           England - East of England (3)
        //         </label>
        //       </li>
        //   </ul>
        // </fieldset>
        return (
            <fieldset id={id} style={style} className={className}>
                <ul className={ulClassName} style={ulStyle}>
                {options.map(option => (
                    <li className={liClassName} style={liStyle} key={id + "-" + option.value}>
                        <input
                            id={id + "-" + option.value}
                            checked={contains(option.value, value)}
                            className={inputClassName}
                            disabled={Boolean(option.disabled)}
                            style={inputStyle}
                            type="checkbox"
                            onChange={() => {
                                let newValue;
                                if (contains(option.value, value)) {
                                    newValue = without([option.value], value);
                                } else {
                                    newValue = append(option.value, value);
                                }
                                this.setState({ value: newValue });
                                if (setProps) {
                                    setProps({ value: newValue });
                                }
                            }}
                        />
                        <label
                            htmlFor={id + "-" + option.value}
                            key={option.value}
                            style={labelStyle}
                            className={labelClassName}
                        >
                            {option.label}
                        </label>
                    </li>
                ))}
                </ul>
            </fieldset>
        );
    }
}

InsightChecklist.propTypes = {
    /*
     * ID of the component
     */
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
     * The class of the container (fieldset)
     */
    className: PropTypes.string,

    /**
     * The style of the container (fieldset)
     */
    style: PropTypes.object,

    /**
     * The style of the <ul> container element
     */
    ulStyle: PropTypes.object,

    /**
     * The class of the <ul> container element
     */
    ulClassName: PropTypes.string,

    /**
     * The style of the <li> element
     */
    liStyle: PropTypes.object,

    /**
     * The class of the <li> element
     */
    liClassName: PropTypes.string,

    /**
     * The style of the <input> checkbox element
     */
    inputStyle: PropTypes.object,

    /**
     * The class of the <input> checkbox element
     */
    inputClassName: PropTypes.string,

    /**
     * The style of the <label> that wraps the checkbox input
     *  and the option's label
     */
    labelStyle: PropTypes.object,

    /**
     * The class of the <label> that wraps the checkbox input
     *  and the option's label
     */
    labelClassName: PropTypes.string,

    /**
     * Dash-assigned callback that gets fired when the value changes.
     */
    setProps: PropTypes.func,
};

InsightChecklist.defaultProps = {
    ulStyle: {},
    ulClassName: '',
    liStyle: {},
    liClassName: '',
    inputStyle: {},
    inputClassName: '',
    labelStyle: {},
    labelClassName: '',
    options: [],
};