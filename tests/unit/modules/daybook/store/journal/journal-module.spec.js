import { createStore } from "vuex"
import journal from '@/modules/daybook/store/journal'
import { journalState } from "../../../../mock-data/test-journal-state"


const createVuexStore = (initialState) => createStore({
    modules: {
        journal: {
            ...journal,
            state: {...initialState }
        }
    }
})

describe('Vuex - Pruebas en el journal module', () => { 
    
    test('este es el estado inicial, debe de tener este state', () => { 
        
        const store = createVuexStore( journalState )
        const { isLoading, entries } = store.state.journal

        expect ( isLoading ).toBeFalsy()
        expect( entries ).toEqual( journalState.entries )
        

     })


     //Mutations

     test('mutation: setEntries ', () => { 
         
        const store = createVuexStore ({ isLoading: true, entries: [] })

        store.commit('journal/setEntries', journalState.entries)

        expect(store.state.journal.entries.length).toBe(2)
        expect(store.state.journal.isLoading).toBeFalsy()

      })

      test('mutation: updateEntry', () => { 
          
        const store = createVuexStore( journalState )

        //update entry
        const updateEntry = {
            id: '-N2TaH-1PytUeeDwf8AZ',
            date: 1653002011576,
            picture:"https://res.cloudinary.com/dw0pbvufu/image/upload/v1653090610/wsgau8xmasmhmxquapsy.jpg",
            text:"Hola mundo desde pruebas"
        }
        store.commit('journal/updateEntry', updateEntry)

        expect(store.state.journal.entries.length).toBe(2)

        expect(store.state.journal.entries.find( e => e.id === updateEntry.id)).toEqual(updateEntry)

       })


       test('mutations: addentry & deleteEntry', () => { 
           
        const store = createVuexStore( journalState )

        //addentry {id: 'ABC-123', text: 'Hola mundo'}

        store.commit('journal/addEntry', {id: 'ABC-123', text: 'Hola mundo'})


        expect (store.state.journal.entries.length).toBe(3)
        expect (store.state.journal.entries.find( e=> e.id === 'ABC-123' )).toBeTruthy()


        store.commit('journal/deleteEntry', 'ABC-123')

        expect(store.state.journal.entries.length).toBe(2)
        expect (store.state.journal.entries.find( e=> e.id === 'ABC-123' )).toBeFalsy()


        })


        /* Getters */

        test('getters: getEntriesByTerm getEntryById', () => { 
            
            const store = createVuexStore( journalState )

            const [entry1, entry2] = journalState.entries

            expect(store.getters['journal/getEntriesByTerm']('').length).toBe(2)
            expect(store.getters['journal/getEntriesByTerm']('Nueva').length).toBe(1)
            
            expect(store.getters['journal/getEntriesByTerm']('Nueva')).toEqual([entry2])
            
            
            expect(store.getters['journal/getEntryById']('-N2TaH-1PytUeeDwf8AZ')).toEqual(entry1)

            
         })


         /* Actions */

         test('actions: loadEntries', async() => { 
             
            const store = createVuexStore ({ isLoading: true, entries: [] })

            await store.dispatch('journal/loadEntries')

            expect(store.state.journal.entries.length).toBe(4)

          })

         test('actions: updateEntry', async() => { 
             
            const store = createVuexStore ( journalState )

            const updateEntry = {
                id: '-N2TaH-1PytUeeDwf8AZ',
                date: 1653002011576,
                picture:"https://res.cloudinary.com/dw0pbvufu/image/upload/v1653090610/wsgau8xmasmhmxquapsy.jpg",
                text:"Hola mundo desde mock-data",
                otroCampo: true,
            }

            await store.dispatch('journal/updateEntry', updateEntry)

            expect(store.state.journal.entries.length).toBe(2)
            expect(store.state.journal.entries.find(e => e.id === updateEntry.id)).toEqual(
                {
                    id: '-N2TaH-1PytUeeDwf8AZ',
                    date: 1653002011576,
                    picture:"https://res.cloudinary.com/dw0pbvufu/image/upload/v1653090610/wsgau8xmasmhmxquapsy.jpg",
                    text:"Hola mundo desde mock-data",
                }
            )


          })

          test('actions: createEntry, deleteEntry', async() => { 
              
                const store = createVuexStore( journalState )

                const newEntry = { date: 1653002011576, text: 'nueva entrada desde pruebas '}

                 const id = await store.dispatch('journal/createEntry', newEntry)

                 expect (typeof id).toBe('string')

                 expect(store.state.journal.entries.find(e => e.id === id)).toBeTruthy()


                 await store.dispatch('journal/deleteEntry', id)
                 expect(store.state.journal.entries.find(e => e.id === id)).toBeFalsy()


           })

 })