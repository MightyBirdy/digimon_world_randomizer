import * as React from 'react'
import { Tooltip, Checkbox, Slider, RadioGroup, Radio } from '@blueprintjs/core'

export enum InputVariation {
    Checkbox,
    Slider,
    Multiselect
}

export interface SectionElement<T> {
    attribute           : keyof T
    inputType           : InputVariation
    label?              : string
    tooltip             : string
    minVal?             : number
    maxVal?             : number
    multiSelect?        : string[]
    multiSelectLabel?   : string[]
}

interface Props {
    inputType           : InputVariation
    label?              : string
    tooltip             : string
    minVal?             : number
    maxVal?             : number
    multiSelect?        : string[]
    multiSelectLabel?   : string[]
    enabled             : boolean
    value               : any
    setValue            : ( value: any ) => void
}


export default function ElementContainer( props: Props ) {
    let input: JSX.Element
    switch( props.inputType ) {
        case InputVariation.Checkbox:
            input = <Checkbox
                        checked={props.value}
                        className="element-checkbox"
                        disabled={!props.enabled}
                        label={props.label}
                        onChange={() => {
                            props.setValue( !props.value )
                        }}/>
            break

        case InputVariation.Slider:
            const stepSize = props.maxVal / 20
            input = <Slider
                        className="element-slider"
                        disabled={!props.enabled}
                        min={props.minVal}
                        max={props.maxVal}
                        stepSize={stepSize}
                        labelStepSize={props.maxVal}
                        showTrackFill={false}
                        onChange={( value ) => {
                            props.setValue( value )
                        }}
                        value={props.value}/>
            break

        case InputVariation.Multiselect:
            input = <RadioGroup
                        onChange={( event ) => { 
                            props.setValue( event.currentTarget.value )
                        }}
                        selectedValue={props.value}>
                        {props.multiSelect.map( ( opt, index ) =>
                            <Radio
                                className="element-option"
                                key={`${props.multiSelectLabel[ index ]}-${index}`}
                                disabled={!props.enabled}
                                value={opt}
                                label={props.multiSelectLabel[ index ]}/>
                        )}
                    </RadioGroup>
            break
    }

    return  <Tooltip 
                popoverClassName="tooltip-popover"
                content={props.tooltip}
                hoverOpenDelay={750}>
                {input}
            </Tooltip>
}