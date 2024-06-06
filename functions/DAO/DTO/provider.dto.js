import { formatDate } from '../../utils/utils.js'

class ProviderDTO {
  constructor(provider) {
    this.id = provider._id
    this.name = provider.name
    this.description = provider.description
    this.contact = {
      firstName: provider.contact.firstName,
      lastName: provider.contact.lastName,
      dni: provider.contact.dni,
      phone: `+${provider.contact.phone.toString().slice(0, 2)} ${provider.contact.phone.toString().slice(2)}`,
      address: provider.contact.address,
      email: provider.contact.email,
      dateBirthday: formatDate(provider.contact.dateBirthday),
      thumbnail: provider.contact.thumbnail,
    }
    this.address = provider.address
    this.city = provider.city
    this.paymentTerms = provider.paymentTerms
  }
}

export { ProviderDTO }
