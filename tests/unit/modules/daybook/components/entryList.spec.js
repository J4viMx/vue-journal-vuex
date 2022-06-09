import { shallowMount } from "@vue/test-utils";
import { createStore } from 'vuex'

import EntryList from '@/modules/daybook/components/EntryList.vue';
import journal from '@/modules/daybook/store/journal'
import { journalState } from '../../../mock-data/test-journal-state'

/* import { getEntriesByTerm } from '@/modules/daybook/store/journal/getters' */

const createVuexStore = (initialState) => createStore({
    modules: {
        journal: {
            ...journal,
            state: {...initialState }
        }
    }
})

describe('Pruebas en el entryList', () => { 

    /* const journalMockModule = {

        namespaced: true,
        getters: {
            getEntriesByTerm
        },
        state: () => ({
            isLoading: false,
            entries: journalState.entries
        })

    }

    const store = createStore({
        modules: {
            journal: {...journalMockModule}
        }
    })
 */
    const store = createVuexStore( journalState )
    const mockRouter = {
        push: jest.fn()
    }


    let wrapper

    beforeEach( () =>  {
        jest.clearAllMocks()
         wrapper = shallowMount( EntryList, {
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [ store ]
            }
        } )
    })
    
    test('debe de llamar el getEntriesbyterm sin termino y mostrar 2 entradas', () => { 
        
        expect(wrapper.findAll('entry-only-stub').length).toBe(2)

     })


     test('debe de llamar el getEntriesByTerm y filtrar las entradas ', async() => { 
        
        const input = wrapper.find('input')
        await input.setValue('mundo')

        expect(wrapper.findAll('entry-only-stub').length).toBe(1)
      })


      test('el boton de nuevo debe de redireccionar a /new ', () => { 
        
        wrapper.find('button').trigger('click')

        expect( mockRouter .push ).toHaveBeenCalledWith({name: 'entry', params: {id: 'new'}})
       })

 })