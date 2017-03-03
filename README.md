# react-native-segmentedControl
react-native-segmentedControl for( Android / Ios )


## Overview
SegmentedControl using react-native,support android and ios.
Pages won't be rendered when you switch to other tabs,also save the status of invisible pages.

## Installation

First you need to install react-native-segmented-control:

```javascript
npm install react-native-segmented-control --save
```

## Props

### Tabbar

| prop | value | required/optional | comment |
| --- | --- | --- | --- |
| defaultPage | number | optional | default:0 |
| itemFontSize | number | optional | text fontsize default:14  |
| itemButtonActiveColor | color | optional | ActiveButton color |
| itemButtonColor | color | optional | defaultButton color |
| itemTextActiveColor | color | optional | ActiveText color |
| itemTextColor | color | optional | defaultText color |
| itemButtonViewStyle | style | optional | button container style |
| itemButtonBorderColor | color | optional | button border color |
| itemHeaderViewStyle | style | optional | header container style |


### Tabbar.Item

| prop | value | required/optional | comment |
| --- | --- | --- | --- |
| title | string | required | title of item |
| onPress | function | optional | the function will be called when item is selected. |


## Usage

```javascript
import SegmentedControl from 'react-native-segmented-control';

<SegmentedControl
    defaultPage={1}
    itemButtonViewStyle = {{
        width:200
    }}
    itemHeaderViewStyle = {{
        paddingVertical:10,
    }}
    ref = {e=>this.SegmentedControl=e}
>
    <SegmentedControl.Item
        title = {'直播'}
    >
        <View>page0</View>
    </SegmentedControl.Item>
    <SegmentedControl.Item
        title = {'点播'}
    >
        <View>page1</View>
    </SegmentedControl.Item>
    <SegmentedControl.Item
        title = {'影音'}
    >
        <View>page2</View>
    </SegmentedControl.Item>
</SegmentedControl>

```

###Methods
* `update(number)` - select item.
```javascript
this.SegmentedControl.update(number)
```

## Screenshot
![](https://github.com/ngstyle/react-native-tabBar/raw/master/screenshot/screenshot_ios.jpg)
![](https://github.com/ngstyle/react-native-tabBar/raw/master/screenshot/screenshot_android.jpg)
