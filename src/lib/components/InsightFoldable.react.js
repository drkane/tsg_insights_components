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
            id,
            container,
            title,
            value,
            child,
            children,
            setProps,
        } = this.props;
        const { isHidden } = this.state;

        if (!('style' in value)){
            value['style'] = {}
        }
        if (!('style' in child)){
            child['style'] = {}
        }
        value['style']['opacity'] = (isHidden ? '1' : '0');
        child['style']['opacity'] = (isHidden ? '0' : '1');

        let containerClass = container.className + " " + (isHidden ? container.foldedClassName : container.unfoldedClassName);
        let titleClass = title.className + " " + (isHidden ? title.foldedClassName : title.unfoldedClassName);
        let valueClass = value.className + " " + (isHidden ? value.unfoldedClassName : value.foldedClassName);
        let childClass = child.className + " " + (isHidden ? child.foldedClassName : child.unfoldedClassName);

        return (
            <div id={id} style={container.style} className={containerClass}>
                <h4 className={titleClass} style={title.style} onClick={this.toggleHidden.bind(this)}>{title.value}</h4>
                <h5 className={valueClass} style={value.style}>{value.value}</h5>
                <div style={child.style} className={childClass}>
                    {children}
                </div>
            </div>
        );
    }
}

const item_proptypes = {
    /**
     * string shown in the title (h4)
     */
    value: PropTypes.string,

    /**
     * name of the class
     */
    className: PropTypes.string,

    /**
     * class applied when folded
     */
    foldedClassName: PropTypes.string,

    /**
     * class applied when unfolded
     */
    unfoldedClassName: PropTypes.string,

    /**
     * The style applied
     */
    style: PropTypes.object,
}

InsightFoldable.propTypes = {
    id: PropTypes.string,

    /**
     * The container for the item
     */
    container: PropTypes.shape(item_proptypes),

    /**
     * The title of the item (click this to toggle)
     */
    title: PropTypes.shape(item_proptypes),

    /**
     * The value (shown when the children are hidden)
     */
    value: PropTypes.shape(item_proptypes),

    /**
     * The child (shown when the item is toggled)
     */
    child: PropTypes.shape(item_proptypes),

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
    title: {
        style: {},
        className: '',
        foldedClassName: '',
        unfoldedClassName: '',
    },
    value: {
        style: {},
        className: '',
        foldedClassName: '',
        unfoldedClassName: '',
    },
    child: {
        style: {},
        className: '',
        foldedClassName: '',
        unfoldedClassName: '',
    },
    container: {
        style: {},
        className: '',
        foldedClassName: '',
        unfoldedClassName: '',
    }
};