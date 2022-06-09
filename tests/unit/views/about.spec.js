import { shallowMount } from '@vue/test-utils'
import About from '@/views/AboutView'

describe('Pruebas en el about View', () => { 
    test('Debe de renderizar el componente correctamente', () => { 
        
        const wrapper = shallowMount(About)
        expect ( wrapper.html() ).toMatchSnapshot()

     })
 })