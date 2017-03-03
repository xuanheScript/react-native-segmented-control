import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableHighlight,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import React, {Component} from 'react'

import SegmentedControlItem from './SegmentedControlItem';

export default class SegmentedControl extends Component {
    static Item = SegmentedControlItem;

    static defaultProps = {
        defaultPage: 0,
        itemFontSize: 14,
        itemButtonActiveColor : '#5E89F7',
        itemButtonColor : '#fff',
        itemTextActiveColor : '#fff',
        itemTextColor : '#5E89F7',
        itemButtonViewStyle : undefined,
        itemButtonBorderColor : '#5E89F7',
        itemHeaderViewStyle : undefined,
    };

    static propTypes = {
        ...View.propTypes,
        style: View.propTypes.style,
        defaultPage: React.PropTypes.number,
        itemFontSize: React.PropTypes.number,
        itemButtonActiveColor: React.PropTypes.string,
        itemButtonColor: React.PropTypes.string,
        itemTextActiveColor: React.PropTypes.string,
        itemTextColor: React.PropTypes.string,
        onItemSelected: React.PropTypes.func,
        itemButtonViewStyle : View.propTypes.style,
        itemButtonBorderColor: React.PropTypes.string,
        itemHeaderViewStyle : View.propTypes.style,
    };

    constructor(props) {
        super(props);

        this.visibles = [];
        this.state = {
            selectedIndex: 0,
        }
    }

    render() {
        let children = this.props.children;
        let childrenLength = this.props.children.length;

        if (!childrenLength) {
            throw new Error(`SegmentedControlItem can not undefined`);
        }

        let navs = [];

        const contentViews = children.map((child,i) => {
            const buttonColor = this.state.selectedIndex == i ? this.props.itemButtonActiveColor : this.props.itemButtonColor;
            const textColor = this.state.selectedIndex == i ? this.props.itemTextActiveColor : this.props.itemTextColor;

            navs[i] = (
                <TouchableOpacity
                    activeOpacity={1}
                    key={i}
                    style={[
                        styles.ItemButton,
                        i > 0 ? {borderLeftWidth:0}:undefined,
                        {backgroundColor:buttonColor},
                        i==0 ? {borderTopLeftRadius:5,borderBottomLeftRadius:5}:undefined,
                        i==childrenLength-1 ? {borderTopRightRadius:5,borderBottomRightRadius:5}:undefined,
                        {borderColor:this.props.itemButtonBorderColor}
                    ]}
                    onPress={() => {
                        if (child.props.onPress) {
                            child.props.onPress();
                        }
                        this.update(i);
                    }}>
                    <Text
                        style={[
                            styles.ItemButtonText,
                            {color: textColor},
                            {fontSize:this.props.itemFontSize}
                        ]}
                    >
                        {child.props.title}
                    </Text>
                </TouchableOpacity>
            );

            if (!this.visibles[i]) {
                return null;
            } else {
                const style = this.state.selectedIndex === i ? styles.base : [styles.base,styles.gone];
                return (
                    <View
                        pointerEvents={this.state.selectedIndex === i ? 'auto' : 'none'}
                        key={'view_' + i}
                        style={style}>
                        {child}
                    </View>
                );
            }
        });

        return (
            <View style={[styles.container,this.props.style]}>
                <View style={[
                    this.props.itemHeaderViewStyle,
                ]}>
                    <View style={[
                        styles.ItemView,
                        this.props.itemButtonViewStyle,
                    ]}>
                        {navs}
                    </View>
                </View>

                <View style={styles.content}>
                    {contentViews}
                </View>
            </View>
        );
    }

    componentDidMount() {
        let page = this.props.defaultPage;

        if (page >= this.props.children.length || page < 0){
            page = 0;
        }

        this.update(page);
    }

    update(index) {
        this.visibles[index] = true;
        this.setState({
            selectedIndex: index,
        });

        if (this.props.onItemSelected) {
            this.props.onItemSelected(index);
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get('window').width,
        overflow: 'hidden',
    },
    content: {
        flex: 1,
    },
    base: {
        position: 'absolute',
        overflow: 'hidden',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    gone: {
        // top: Dimensions.get('window').height,
        // bottom: -Dimensions.get('window').height,
        opacity: 0,
    },
    nav: {
        flexDirection: 'row',
        width: Dimensions.get('window').width,
        borderTopWidth:1,
        borderColor:'#eaeaea',
    },
    navItem: {
        flex: 1,
        paddingTop: 6,
        paddingBottom: 6,
        alignItems: 'center',
    },
    center: {
        width: 56,
        alignItems: 'center',
        justifyContent: 'center',
    },
    navImage: {
        width: 24,
        height: 24,
        marginBottom: 2,
    },
    navImageChange: {
        top: -28,
        width: 56,
        height: 56,
        marginBottom: 2,
        position: 'absolute',
        borderRadius: 28,
        borderWidth: 3,
        borderColor: '#fff',
        alignSelf: 'center'
    },
    navTextChange: {
        marginTop: 30,
        fontSize: 11,
        alignSelf: 'center'
    },
    navText: {
        marginTop: 2,
        alignSelf: 'center',
    },
    horizonLine: {
        backgroundColor: '#adadad',
        height: 1,
        width: Dimensions.get('window').width,
    },
    badgeNoNumber: {
        flexDirection: 'row',
        justifyContent: 'center',
        top: -2,
        left: 36,
        position: 'absolute',
        width: 10,
        height: 10,
        borderRadius: 10,
        borderWidth: 1,
        alignItems: 'center',
        borderColor: '#ffffff',
        backgroundColor: '#ff0000',
    },
    badgeWithNumber: {
        flexDirection: 'row',
        justifyContent: 'center',
        top: -4,
        left: 36,
        position: 'absolute',
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ffffff',
        backgroundColor: '#ff0000',
    },
    badgeText: {
        alignSelf: 'center',
        fontSize: 11,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
    ItemView:{
        flexDirection:'row',
        justifyContent:'center',
        alignSelf:'center',
    },
    ItemButton:{
        paddingHorizontal:10,
        paddingVertical:5,
        borderWidth:1,
        flex:1,
        alignItems:'center',
    },
    ItemButtonText:{

    },
});
