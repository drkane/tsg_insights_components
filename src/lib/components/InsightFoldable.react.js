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

        for (var c of [container, title, value, child]) {
            if (!('style' in c)) {
                c['style'] = {};
            }
            for (var f of ["className", "foldedClassName", "unfoldedClassName"]){
                if (!(f in c)) {
                    c[f] = '';
                }
            }
        }

        value['style'] = Object.assign({}, value['style'], {'opacity': (isHidden ? '1' : '0')});
        child['style'] = Object.assign({}, child['style'], {'opacity': (isHidden ? '0' : '1')});

        var containerClass = (container.className ? container.className : '') + " " + (isHidden ? container.foldedClassName : container.unfoldedClassName);
        var titleClass = (title.className ? title.className : '') + " " + (isHidden ? title.foldedClassName : title.unfoldedClassName);
        var valueClass = (value.className ? value.className : '') + " " + (isHidden ? value.unfoldedClassName : value.foldedClassName);
        var childClass = (child.className ? child.className : '') + " " + (isHidden ? child.foldedClassName : child.unfoldedClassName);

        return (
            <div id={id} style={container.style} className={containerClass}>
                <h4 className={titleClass} key={title.style.opacity} style={title.style} onClick={this.toggleHidden.bind(this)}>{title.value}</h4>
                <h5 className={valueClass} key={value.style.opacity} style={value.style}>{value.value}</h5>
                <div style={child.style} key={child.style.opacity} className={childClass}>
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
    /*
     * ID of the component
     */
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