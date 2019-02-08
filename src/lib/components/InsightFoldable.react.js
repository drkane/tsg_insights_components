import PropTypes from 'prop-types';
import { append, contains, without } from 'ramda';
import React, { Component } from 'react';

/**
 * An element that can be hidden by clicking on the `title`
 * element. The `value` text is shown when hidden, otherwise
 * `children` are displayed.
 */
export default class InsightFoldable extends Component {
    constructor(props) {
        super(props);
        this.state = { isHidden: true };
    }

    toggleHidden () {
        this.setState({
            isHidden: !this.state.isHidden
        })
    }

    render() {
        const {
            className,
            id,
            style,
            title,
            titleClassName,
            titleFoldedClassName,
            titleUnfoldedClassName,
            titleStyle,
            valueClassName,
            valueStyle,
            value,
            children,
            setProps,
        } = this.props;
        const { isHidden } = this.state;

        valueStyle['display'] = (isHidden ? 'initial' : 'none');
        let childStyle = { 'display': (isHidden ? 'none' : 'initial')};

        let titleClass = titleClassName + " " + (isHidden ? titleFoldedClassName : titleUnfoldedClassName);

        return (
            <div id={id} style={style} className={className}>
                <h4 className={titleClass} style={titleStyle} onClick={this.toggleHidden.bind(this)}>{title}</h4>
                <h5 className={valueClassName} style={valueStyle}>{value}</h5>
                <div style={childStyle}>
                    {children}
                </div>
            </div>
        );
    }
}

InsightFoldable.propTypes = {
    id: PropTypes.string,


    /**
     * The title of the item (click this to toggle)
     */
    title: PropTypes.string,

    /**
     * The item shown if hidden
     */
    value: PropTypes.string,

    /**
     * The class of the container (div)
     */
    className: PropTypes.string,

    /**
     * The style of the container (div)
     */
    style: PropTypes.object,

    /**
     * The style of the <h4> title element
     */
    titleStyle: PropTypes.object,

    /**
     * The class of the <h4> title element
     */
    titleClassName: PropTypes.string,

    /**
     * The class of the <h4> title element when folded
     */
    titleFoldedClassName: PropTypes.string,

    /**
     * The class of the <h4> title element when unfolded
     */
    titleUnfoldedClassName: PropTypes.string,

    /**
     * The style of the <h5> value element - shown if main element is hidden
     */
    valueStyle: PropTypes.object,

    /**
     * The class of the <h5> value element - shown if main element is hidden
     */
    valueClassName: PropTypes.string,

    /**
     * The children of this component
     */
    children: PropTypes.node,

    /**
     * Dash-assigned callback that gets fired when the value changes.
     */
    setProps: PropTypes.func,
};

InsightFoldable.defaultProps = {
    titleStyle: {},
    titleClassName: '',
    titleFoldedClassName: '',
    titleUnfoldedClassName: '',
    valueStyle: {},
    valueClassName: '',
};